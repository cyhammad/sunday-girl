import { NextResponse } from "next/server";

const KLAVIYO_API_URL = "https://a.klaviyo.com/api";
const KLAVIYO_REVISION = "2024-02-15";

export async function POST(request) {
    try {
        const { email, firstName, phone, wantMore } = await request.json();

        // Validate required fields
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
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
            email,
            ...(firstName && { first_name: firstName }),
            ...(phone && { phone_number: phone }),
            properties: {
                ...(wantMore && { want_more_of: wantMore }),
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

        // Handle duplicate profile (409 conflict) - reject duplicate submissions
        let profileId;
        if (profileResponse.status === 409) {
            return NextResponse.json(
                { error: "This email is already on the waitlist!" },
                { status: 409 }
            );
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
