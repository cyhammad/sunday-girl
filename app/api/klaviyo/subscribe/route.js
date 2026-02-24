import { NextResponse } from "next/server";

const KLAVIYO_API_URL = "https://a.klaviyo.com/api";
// Use the latest Klaviyo API revision so we can call the bulk subscribe endpoint
const KLAVIYO_REVISION = "2026-01-15";

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
        const { email, firstName, phone, wantMore } = await request.json();

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

        // Build profile attributes (general profile data + custom properties)
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
            // Profile already exists — resolve the existing profile and update it
            const errorData = await profileResponse.json();
            profileId = errorData.errors?.[0]?.meta?.duplicate_profile_id;

            // Fallback: look up profile by email if ID is not in the error meta
            if (!profileId) {
                const searchResponse = await fetch(
                    `${KLAVIYO_API_URL}/profiles/?filter=equals(email,"${normalizedEmail}")`,
                    {
                        headers: {
                            Authorization: `Klaviyo-API-Key ${privateKey}`,
                            revision: KLAVIYO_REVISION,
                        },
                    }
                );
                const searchData = await searchResponse.json();
                profileId = searchData.data?.[0]?.id;
            }

            if (!profileId) {
                console.error("Unable to resolve duplicate Klaviyo profile for email", normalizedEmail);
                return NextResponse.json(
                    { error: "Failed to resolve existing profile" },
                    { status: 500 }
                );
            }

            // Properly update the existing profile instead of trying to recreate it
            const updateResponse = await fetch(`${KLAVIYO_API_URL}/profiles/${profileId}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Klaviyo-API-Key ${privateKey}`,
                    "Content-Type": "application/json",
                    revision: KLAVIYO_REVISION,
                },
                body: JSON.stringify({
                    data: {
                        type: "profile",
                        id: profileId,
                        attributes: profileAttributes,
                    },
                }),
            });

            if (!updateResponse.ok) {
                const updateError = await updateResponse.json().catch(() => null);
                console.error("Klaviyo update profile error:", updateError);

                const klaviyoDetail = updateError?.errors?.[0]?.detail;
                if (updateResponse.status === 400 && klaviyoDetail) {
                    // Map Klaviyo's technical SMS error to a user-friendly message
                    let message = klaviyoDetail;
                    if (
                        klaviyoDetail.includes("ChannelType.SMS") ||
                        klaviyoDetail.includes("does not exist or is ineligible")
                    ) {
                        message =
                            "The phone number provided either does not exist or cannot receive text messages. Please double-check the number or use a different one.";
                    }

                    return NextResponse.json(
                        { error: message },
                        { status: 400 }
                    );
                }

                return NextResponse.json(
                    { error: "Failed to update profile" },
                    { status: 500 }
                );
            }
        } else if (!profileResponse.ok) {
            const errorData = await profileResponse.json().catch(() => null);
            console.error("Klaviyo API error:", errorData);
            return NextResponse.json(
                { error: "Failed to subscribe" },
                { status: 500 }
            );
        } else {
            const profileData = await profileResponse.json();
            profileId = profileData.data.id;
        }

        // Use Klaviyo's bulk_subscribe_profiles endpoint so profiles are actually SUBSCRIBED
        const listId = process.env.KLAVIYO_LIST_ID;

        // Build subscription channels: always subscribe to email marketing,
        // and to SMS marketing only if we have a valid E.164 phone number.
        const subscriptions = {
            email: {
                marketing: {
                    consent: "SUBSCRIBED",
                },
            },
        };

        if (normalizedPhone) {
            subscriptions.sms = {
                marketing: {
                    consent: "SUBSCRIBED",
                },
            };
        }

        const bulkSubscribeBody = {
            data: {
                type: "profile-subscription-bulk-create-job",
                attributes: {
                    custom_source: "Website Waitlist",
                    profiles: {
                        data: [
                            {
                                type: "profile",
                                attributes: {
                                    email: normalizedEmail,
                                    ...(normalizedPhone && { phone_number: normalizedPhone }),
                                    subscriptions,
                                },
                            },
                        ],
                    },
                },
                ...(listId && {
                    relationships: {
                        list: {
                            data: {
                                type: "list",
                                id: listId,
                            },
                        },
                    },
                }),
            },
        };

        const bulkSubscribeResponse = await fetch(
            `${KLAVIYO_API_URL}/profile-subscription-bulk-create-jobs`,
            {
                method: "POST",
                headers: {
                    Authorization: `Klaviyo-API-Key ${privateKey}`,
                    "Content-Type": "application/vnd.api+json",
                    revision: KLAVIYO_REVISION,
                },
                body: JSON.stringify(bulkSubscribeBody),
            }
        );

        if (!bulkSubscribeResponse.ok) {
            const bulkError = await bulkSubscribeResponse.json().catch(() => null);
            console.error("Klaviyo bulk subscribe error:", bulkError);
            return NextResponse.json(
                { error: "Failed to subscribe profile to marketing" },
                { status: 500 }
            );
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
