"use client";

import Script from "next/script";
import { createContext, useContext, useState, useCallback } from "react";

const RecaptchaContext = createContext(null);

export function useRecaptcha() {
    const ctx = useContext(RecaptchaContext);
    if (!ctx) throw new Error("useRecaptcha must be used inside RecaptchaProvider");
    return ctx;
}

// Polls until grecaptcha.enterprise is available or times out
function waitForRecaptcha(timeout = 5000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            if (window?.grecaptcha?.enterprise) {
                clearInterval(interval);
                resolve();
            } else if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject(new Error("reCAPTCHA timed out"));
            }
        }, 100);
    });
}

export default function RecaptchaProvider({ children }) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcXg1QsAAAAAIp1hCVoRpSImef0rbKSJFq9Nvc5";
    const [loaded, setLoaded] = useState(false);

    const executeRecaptcha = useCallback(
        async (action) => {
            // Wait for script to be ready if not yet loaded
            if (!loaded) {
                await waitForRecaptcha();
            }

            return new Promise((resolve, reject) => {
                if (!window?.grecaptcha?.enterprise) {
                    return reject("reCAPTCHA not loaded");
                }
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
            });
        },
        [loaded, siteKey]
    );

    return (
        <RecaptchaContext.Provider value={{ executeRecaptcha }}>
            <Script
                id="recaptcha-enterprise"
                src={`https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`}
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
                onError={(e) => console.error("reCAPTCHA failed to load", e)}
            />
            {children}
        </RecaptchaContext.Provider>
    );
}