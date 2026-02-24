"use client";

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function RecaptchaProvider({ children }) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcXg1QsAAAAAIp1hCVoRpSImef0rbKSJFq9Nvc5";

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={siteKey}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}

// Helper hook to match the previous executeRecaptcha interface
export function useRecaptcha() {
    const { executeRecaptcha: executeReactRecaptcha } = useGoogleReCaptcha();

    const executeRecaptcha = async (action) => {
        if (!executeReactRecaptcha) {
            throw new Error("reCAPTCHA not loaded");
        }
        // Execution returns a token string
        const token = await executeReactRecaptcha(action);
        return token;
    };

    return { executeRecaptcha };
}