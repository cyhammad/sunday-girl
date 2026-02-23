"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowIcon } from "@/icons/landing-icons";
import Link from "next/link";

const Section3 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    wantMore: "",
    consent: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    consent: "",
    recaptcha: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // No longer needs manual script injection, handled by layout Script tag
  useEffect(() => {
    // Ensuring the environment variable is present for the component
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      console.warn("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing");
    }
  }, []);

  const resetForm = () => {
    setFormData({
      firstName: "",
      email: "",
      phone: "",
      wantMore: "",
      consent: false,
    });
    setErrors({
      email: "",
      phone: "",
      consent: "",
      recaptcha: "",
    });
  };

  const validateEmail = (rawEmail) => {
    const email = String(rawEmail ?? "")
      .trim()
      .toLowerCase();

    if (!email)
      return "What’s your email? We’ll send your waitlist updates there.";
    if (email.length > 254)
      return "That email looks too long. Please double-check it.";

    const atParts = email.split("@");
    if (atParts.length !== 2)
      return "That email doesn’t look right (try name@domain.com).";

    const [local, domain] = atParts;
    if (!local || !domain)
      return "That email doesn’t look right (try name@domain.com).";
    if (local.startsWith(".") || local.endsWith("."))
      return "That email doesn’t look right (try name@domain.com).";
    if (local.includes(".."))
      return "That email doesn’t look right (try name@domain.com).";

    // Domain must include a dot + a real-ish TLD (blocks missing extensions like name@domain)
    if (!domain.includes("."))
      return "Please include a full domain (like gmail.com).";
    if (domain.startsWith(".") || domain.endsWith("."))
      return "Please include a full domain (like gmail.com).";
    if (domain.includes(".."))
      return "Please include a full domain (like gmail.com).";

    const labels = domain.split(".");
    if (labels.some((l) => !l))
      return "Please include a full domain (like gmail.com).";

    const tld = labels[labels.length - 1];
    if (!/^[a-z]{2,24}$/.test(tld))
      return "Please include a valid domain extension (like .com).";

    const labelOk = (label) =>
      /^[a-z0-9-]+$/.test(label) &&
      !label.startsWith("-") &&
      !label.endsWith("-");
    if (!labels.every(labelOk))
      return "That email domain doesn’t look right. Please double-check it.";

    return "";
  };

  const parseUsPhone = (rawPhone) => {
    const raw = String(rawPhone ?? "").trim();
    if (!raw) return { digits10: "", e164: "", extension: "" };

    // Extract common extension patterns at end: "x123", "ext 123", "ext.123", "extension: 123", "#123"
    const extMatch = raw.match(
      /(?:^|\s)(?:ext\.?|extension|x|#)\s*[:.\-]?\s*(\d{1,10})\s*$/i,
    );
    const extension = extMatch?.[1] ?? "";
    const mainPart = extMatch ? raw.slice(0, extMatch.index).trim() : raw;

    // Keep digits from the main phone number only
    let digits = mainPart.replace(/\D/g, "");

    // Allow optional US country code
    if (digits.length === 11 && digits.startsWith("1"))
      digits = digits.slice(1);

    if (digits.length !== 10) {
      return {
        digits10: "",
        e164: "",
        extension,
        error:
          "Please enter a valid US phone number (10 digits). Extensions like “x123” are ok.",
      };
    }

    return { digits10: digits, e164: `+1${digits}`, extension };
  };

  const validatePhone = (rawPhone) => {
    const raw = String(rawPhone ?? "").trim();

    // Phone is optional
    if (!raw) return "";

    // Only allow 10 or 11 digit numerical phone numbers
    if (!/^\d{10,11}$/.test(raw)) {
      return "Please enter a valid phone number with 10 or 11 digits (numbers only).";
    }

    return "";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      // Keep raw text so users can type freely; validation runs on submit.
      setFormData((prev) => ({ ...prev, phone: value }));
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    if (id === "email") {
      setFormData((prev) => ({ ...prev, email: value }));
      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, wantMore: value }));
  };

  const handleConsentChange = (checked) => {
    setFormData((prev) => ({ ...prev, consent: checked }));
    if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields first (before awaiting reCAPTCHA)
    const fieldErrors = {
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      consent: formData.consent
        ? ""
        : "Please check the box to agree to Terms & Privacy.",
      recaptcha: "",
    };

    const hasFieldErrors = Object.values(fieldErrors).some(Boolean);
    if (hasFieldErrors) {
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields and try again.");
      if (fieldErrors.email) emailInputRef.current?.focus();
      else if (fieldErrors.phone) phoneInputRef.current?.focus();
      return;
    }

    // Execute reCAPTCHA Enterprise (invisible — no widget needed)
    let recaptchaToken = "";
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcXg1QsAAAAAIp1hCVoRpSImef0rbKSJFq9Nvc5";

      // Retry logic: Wait up to 2 seconds for grecaptcha to appear
      let captcha = window.grecaptcha?.enterprise || window.grecaptcha;
      if (!captcha) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        captcha = window.grecaptcha?.enterprise || window.grecaptcha;
      }

      if (!captcha) {
        console.error("reCAPTCHA library not found on window after retry.");
        throw new Error("reCAPTCHA library not loaded. Please wait a moment and try again.");
      }

      recaptchaToken = await new Promise((resolve, reject) => {
        captcha.ready(async () => {
          try {
            const token = await captcha.execute(siteKey, {
              action: "WAITLIST_SUBMIT",
            });
            resolve(token);
          } catch (err) {
            console.error("Execute Error:", err);
            reject(err);
          }
        });
      });
    } catch (err) {
      console.error("reCAPTCHA Error:", err);
      setErrors((prev) => ({
        ...prev,
        recaptcha: "reCAPTCHA could not be loaded. Please refresh and try again.",
      }));
      toast.error("reCAPTCHA could not be loaded. Please refresh and try again.");
      return;
    }

    if (!recaptchaToken) {
      setErrors((prev) => ({
        ...prev,
        recaptcha: "reCAPTCHA verification failed. Please try again.",
      }));
      toast.error("reCAPTCHA verification failed. Please try again.");
      return;
    }

    setErrors({ email: "", phone: "", consent: "", recaptcha: "" });

    setIsLoading(true);

    try {
      const response = await fetch("/api/klaviyo/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          phone: formData.phone,
          wantMore: formData.wantMore,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Field-level errors (if API returns them)
        if (response.status === 400 && data?.field) {
          setErrors((prev) => ({
            ...prev,
            [data.field]: data.error || "Please double-check this field.",
          }));
          if (data.field === "email") emailInputRef.current?.focus();
          if (data.field === "phone") phoneInputRef.current?.focus();
          return;
        }

        throw new Error(data.error || "Something went wrong");
      }

      // Show success toast and reset form
      toast.success("We saved you a seat. Welcome in! 🎉");
      resetForm();
    } catch (err) {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const wantOptions = [
    { value: "joy", label: "Joy" },
    { value: "connection", label: "Connection" },
    { value: "confidence", label: "Confidence" },
    { value: "clarity", label: "Clarity" },
    { value: "motivation", label: "Motivation" },
    { value: "other", label: "Other" },
  ];
  return (
    <div
      id="section3"
      className="grid lg:grid-cols-2 sm:gap-9 gap-4 self-center max-w-360"
    >
      <div className="relative rounded-2xl min-h-[389px] sm:min-h-auto overflow-hidden">
        <Image
          src="/sect-3.png"
          alt="Lifestyle photograph"
          width={618}
          height={736}
          className="w-full h-full lg:h-[826px] object-cover rounded-2xl"
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 bg-white rounded-2xl flex flex-col w-full items-center justify-center gap-6 p-6 md:p-8">
        <h2 className="text-2xl sm:text-[28px] font-semibold text-[#2A2A2A]">
          If this sounds like your kind of vibe, the waitlist is open. You'll
          fit right in.
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={isLoading}
              suppressHydrationWarning={true}
              className="w-full rounded-md placeholder:text-[#999DA0]"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              ref={emailInputRef}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              suppressHydrationWarning={true}
              className="w-full rounded-md placeholder:text-[#999DA0]"
            />
            {errors.email ? (
              <p id="email-error" className="text-sm text-red-600">
                {errors.email}
              </p>
            ) : null}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
              ref={phoneInputRef}
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              suppressHydrationWarning={true}
              className="w-full rounded-md placeholder:text-[#999DA0]"
            />
            {errors.phone ? (
              <p id="phone-error" className="text-sm text-red-600">
                {errors.phone}
              </p>
            ) : null}
          </div>

          {/* Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="heart">What do you want more of?</Label>
            <Select
              value={formData.wantMore}
              onValueChange={handleSelectChange}
              disabled={isLoading}
            >
              <SelectTrigger
                id="heart"
                className="w-full text-sm"
                suppressHydrationWarning={true}
              >
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {wantOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Consent Checkbox */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={handleConsentChange}
                disabled={isLoading}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-0.75"
                suppressHydrationWarning={true}
              />
              <label
                htmlFor="consent"
                className="text-[14px] leading-tight text-[#414141] font-normal"
              >
                By clicking <b>Submit</b>, you confirm that you’re 13 or older
                and agree to receive emails and text messages from us with
                updates, content, and community news. You can opt out anytime —
                reply STOP to texts or Unsubscribe via email. <br />
                <Link
                  className="text-primary hover:font-bold transition-all ease-in-out duration-300"
                  href="/privacy-policy"
                >
                  Terms & Privacy
                </Link>
              </label>
            </div>
            {errors.consent ? (
              <p id="consent-error" className="text-sm text-red-600">
                {errors.consent}
              </p>
            ) : null}
          </div>

          {/* reCAPTCHA Enterprise — invisible, no widget rendered */}
          {errors.recaptcha ? (
            <p className="text-sm text-red-600">{errors.recaptcha}</p>
          ) : null}

          {/* Submit Button */}
          <Button
            type="submit"
            size="xl"
            disabled={isLoading}
            suppressHydrationWarning={true}
            className="mt-2 text-xl h-[58px] md:h-[58px] w-[165px] gap-1.5"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : (
              <>
                I'm so in
                <ArrowIcon className="size-5" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Section3;
