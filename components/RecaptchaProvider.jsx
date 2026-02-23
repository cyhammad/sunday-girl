"use client";

import Script from "next/script";
import { createContext, useContext } from "react";

const RecaptchaContext = createContext(null);

export function useRecaptcha() {
    const ctx = useContext(RecaptchaContext);
    if (!ctx) throw new Error("useRecaptcha must be used inside RecaptchaProvider");
    return ctx;
}

export default function RecaptchaProvider({ children }) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcXg1QsAAAAAIp1hCVoRpSImef0rbKSJFq9Nvc5";

    const executeRecaptcha = async (action) => {
        return new Promise((resolve, reject) => {
            // 10s timeout to avoid hanging forever if script blocked
            const timeoutId = setTimeout(() => {
                reject(new Error("reCAPTCHA script failed to load or initialize in time."));
            }, 10000);

            const checkAndExecute = () => {
                if (typeof window !== "undefined" && window.grecaptcha?.enterprise) {
                    clearTimeout(timeoutId);
                    window.grecaptcha.enterprise.ready(async () => {
                        try {
                            const token = await window.grecaptcha.enterprise.execute(
                                siteKey,
                                { action }
                            );
                            resolve(token);
                        } catch (err) {
                            reject(err);
                        }
                    });
                } else {
                    // Retry every 100ms if not ready yet
                    setTimeout(checkAndExecute, 100);
                }
            };

            checkAndExecute();
        });
    };

    return (
        <RecaptchaContext.Provider value={{ executeRecaptcha }}>
            <Script
                src={`https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`}
                strategy="afterInteractive"
            />
            {children}
        </RecaptchaContext.Provider>
    );
}
