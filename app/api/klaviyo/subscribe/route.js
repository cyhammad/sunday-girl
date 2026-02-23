import { NextResponse } from "next/server";

const KLAVIYO_API_URL = "https://a.klaviyo.com/api";
const KLAVIYO_REVISION = "2024-02-15";

function validateEmail(rawEmail) {
    const email = String(rawEmail ?? "").trim().toLowerCase();

    if (!email) return "Email is required";
    if (email.length > 254) return "That email looks too long. Please double-check it.";

    const atParts = email.split("@");
    if (atParts.length !== 2) return "That email doesn’t look right (try name@domain.com).";

    const [local, domain] = atParts;
    if (!local || !domain) return "That email doesn’t look right (try name@domain.com).";
    if (local.startsWith(".") || local.endsWith(".")) return "That email doesn’t look right (try name@domain.com).";
    if (local.includes("..")) return "That email doesn’t look right (try name@domain.com).";

    if (!domain.includes(".")) return "Please include a full domain (like gmail.com).";
    if (domain.startsWith(".") || domain.endsWith(".")) return "Please include a full domain (like gmail.com).";
    if (domain.includes("..")) return "Please include a full domain (like gmail.com).";

    const labels = domain.split(".");
    if (labels.some((l) => !l)) return "Please include a full domain (like gmail.com).";

    const tld = labels[labels.length - 1];
    if (!/^[a-z]{2,24}$/.test(tld)) return "Please include a valid domain extension (like .com).";

    const labelOk = (label) => /^[a-z0-9-]+$/.test(label) && !label.startsWith("-") && !label.endsWith("-");
    if (!labels.every(labelOk)) return "That email domain doesn’t look right. Please double-check it.";

    return "";
}

function normalizePhoneDigits(rawPhone) {
    return String(rawPhone ?? "").replace(/\D/g, "");
}

function normalizePhoneForKlaviyo(rawPhone) {
    const raw = String(rawPhone ?? "").trim();
    if (!raw) return { value: null, extension: "", error: "" }; // optional

    // Extract extension patterns at end: x123 / ext 123 / extension: 123 / #123
    const extMatch = raw.match(/(?:^|\s)(?:ext\.?|extension|x|#)\s*[:.\-]?\s*(\d{1,10})\s*$/i);
    const extension = extMatch?.[1] ?? "";
    const mainPart = extMatch ? raw.slice(0, extMatch.index).trim() : raw;

    let digits = normalizePhoneDigits(mainPart);

    // Allow optional US country code
    if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);

    if (digits.length !== 10) {
        return {
            value: null,
            extension,
            error: "Please enter a valid US phone number (10 digits). Extensions like “x123” are ok.",
        };
    }

    return { value: `+1${digits}`, extension, error: "" };
}

export async function POST(request) {
    try {
        const { email, firstName, phone, wantMore, recaptchaToken } = await request.json();

        // Validate reCAPTCHA
        if (!recaptchaToken) {
            return NextResponse.json(
                { error: "reCAPTCHA token is missing" },
                { status: 400 }
            );
        }

        const recaptchaApiKey = process.env.RECAPTCHA_API_KEY;
        const recaptchaProjectId = process.env.RECAPTCHA_PROJECT_ID; // Keeping RECAPTCHA_PROJECT_ID to match .env
        const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcXg1QsAAAAAIp1hCVoRpSImef0rbKSJFq9Nvc5";

        if (recaptchaApiKey && recaptchaProjectId) {
            // Call reCAPTCHA Enterprise Assessment API
            const assessmentUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${recaptchaProjectId}/assessments?key=${recaptchaApiKey}`;

            const verifyRes = await fetch(assessmentUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event: {
                        token: recaptchaToken,
                        siteKey: recaptchaSiteKey,
                        expectedAction: "WAITLIST_SUBMIT", // must match what you passed on frontend
                    }
                }),
            });

            const assessment = await verifyRes.json();

            // Check token validity
            if (!assessment.tokenProperties?.valid) {
                console.error("Invalid token:", assessment.tokenProperties?.invalidReason);
                return NextResponse.json({ error: "Invalid reCAPTCHA token" }, { status: 400 });
            }

            // Check action matches
            if (assessment.tokenProperties.action !== "WAITLIST_SUBMIT") {
                return NextResponse.json({ error: "Action mismatch" }, { status: 400 });
            }

            // Check score (0.0 = likely bot, 1.0 = likely human)
            const score = assessment.riskAnalysis?.score;
            if (score < 0.3) {
                return NextResponse.json({ error: "Suspected bot activity" }, { status: 400 });
            }
        }

        // Validate required fields
        const emailError = validateEmail(email);
        if (emailError) {
            return NextResponse.json(
                { field: "email", error: emailError },
                { status: 400 }
            );
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const { value: normalizedPhone, extension: phoneExtension, error: phoneError } = normalizePhoneForKlaviyo(phone);
        if (phoneError) {
            return NextResponse.json(
                { field: "phone", error: phoneError },
                { status: 400 }
            );
        }

        const privateKey = process.env.KLAVIYO_PRIVATE_KEY;

        if (!privateKey) {
            console.error("KLAVIYO_PRIVATE_KEY is not configured");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Build profile attributes
        const profileAttributes = {
            email: normalizedEmail,
            ...(firstName && { first_name: firstName }),
            ...(normalizedPhone && { phone_number: normalizedPhone }),
            properties: {
                ...(wantMore && { want_more_of: wantMore }),
                ...(phoneExtension && { phone_extension: phoneExtension }),
                source: "website_waitlist",
            },
        };

        // Create or update profile using Klaviyo API
        const profileResponse = await fetch(`${KLAVIYO_API_URL}/profiles/`, {
            method: "POST",
            headers: {
                Authorization: `Klaviyo-API-Key ${privateKey}`,
                "Content-Type": "application/json",
                revision: KLAVIYO_REVISION,
            },
            body: JSON.stringify({
                data: {
                    type: "profile",
                    attributes: profileAttributes,
                },
            }),
        });

        let profileId;
        if (profileResponse.status === 409) {
            // Duplicate profile - fetch the existing profile ID to proceed
            const errorData = await profileResponse.json();
            // Klaviyo errors for 409 usually include the ID in the error meta/detail
            profileId = errorData.errors?.[0]?.meta?.duplicate_profile_id;

            // If ID wasn't in the error, we try to fetch it by email
            if (!profileId) {
                const searchResponse = await fetch(`${KLAVIYO_API_URL}/profiles/?filter=equals(email,"${normalizedEmail}")`, {
                    headers: {
                        Authorization: `Klaviyo-API-Key ${privateKey}`,
                        revision: KLAVIYO_REVISION,
                    }
                });
                const searchData = await searchResponse.json();
                profileId = searchData.data?.[0]?.id;
            }
        } else if (!profileResponse.ok) {
            const errorData = await profileResponse.json();
            console.error("Klaviyo API error:", errorData);
            return NextResponse.json(
                { error: "Failed to subscribe" },
                { status: 500 }
            );
        } else {
            const profileData = await profileResponse.json();
            profileId = profileData.data.id;
        }

        // Subscribe to email list if KLAVIYO_LIST_ID is configured
        const listId = process.env.KLAVIYO_LIST_ID;
        if (listId && profileId) {
            await fetch(`${KLAVIYO_API_URL}/lists/${listId}/relationships/profiles/`, {
                method: "POST",
                headers: {
                    Authorization: `Klaviyo-API-Key ${privateKey}`,
                    "Content-Type": "application/json",
                    revision: KLAVIYO_REVISION,
                },
                body: JSON.stringify({
                    data: [
                        {
                            type: "profile",
                            id: profileId,
                        },
                    ],
                }),
            });
        }

        return NextResponse.json(
            { success: true, message: "Successfully subscribed!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
