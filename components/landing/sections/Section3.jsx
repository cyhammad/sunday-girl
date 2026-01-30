"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
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
  const recaptchaRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

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
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const validateEmail = (rawEmail) => {
    const email = String(rawEmail ?? "").trim().toLowerCase();

    if (!email) return "What’s your email? We’ll send your waitlist updates there.";
    if (email.length > 254) return "That email looks too long. Please double-check it.";

    const atParts = email.split("@");
    if (atParts.length !== 2) return "That email doesn’t look right (try name@domain.com).";

    const [local, domain] = atParts;
    if (!local || !domain) return "That email doesn’t look right (try name@domain.com).";
    if (local.startsWith(".") || local.endsWith(".")) return "That email doesn’t look right (try name@domain.com).";
    if (local.includes("..")) return "That email doesn’t look right (try name@domain.com).";

    // Domain must include a dot + a real-ish TLD (blocks missing extensions like name@domain)
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
  };

  const normalizePhoneDigits = (rawPhone) => String(rawPhone ?? "").replace(/\D/g, "");

  const validatePhone = (rawPhone) => {
    const digits = normalizePhoneDigits(rawPhone);
    if (!digits) return ""; // phone is optional
    if (digits.length < 10) return "That phone number is too short — please enter 10 digits.";
    if (digits.length > 10) return "That phone number looks too long — please enter 10 digits.";
    return "";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      const digitsOnly = normalizePhoneDigits(value);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
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

    const recaptchaToken = recaptchaRef.current.getValue();

    // Validation (show inline errors on submit)
    const nextErrors = {
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      consent: formData.consent ? "" : "Please check the box to agree to Terms & Privacy.",
      recaptcha: recaptchaToken ? "" : "Please complete the reCAPTCHA to submit.",
    };

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setErrors(nextErrors);
      toast.error("Please fix the highlighted fields and try again.");
      if (nextErrors.email) emailInputRef.current?.focus();
      else if (nextErrors.phone) phoneInputRef.current?.focus();
      return;
    }

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
        // Specific, inline feedback for common cases
        if (response.status === 409) {
          setErrors((prev) => ({
            ...prev,
            email: data.error || "Looks like you’re already on the waitlist with this email.",
          }));
          emailInputRef.current?.focus();
          return;
        }

        // Field-level errors (if API returns them)
        if (response.status === 400 && data?.field) {
          setErrors((prev) => ({ ...prev, [data.field]: data.error || "Please double-check this field." }));
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
    <div id="section3" className="grid lg:grid-cols-2 sm:gap-9 gap-4 self-center max-w-360">
      <div className="relative rounded-2xl min-h-[389px] sm:min-h-auto overflow-hidden">
        <Image
          src="/sect-3.png"
          alt="Lifestyle photograph"
          width={618}
          height={736}
          className="w-full h-full max-h-[826px] object-cover rounded-2xl"
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
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
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
              <SelectTrigger className="w-full text-sm">
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
              />
              <label htmlFor="consent" className="text-[14px] leading-tight text-[#414141] font-normal">
                By clicking <b>Submit</b>, you confirm to{" "}
                <Link className="text-primary hover:font-bold transition-all ease-in-out duration-300" href="/privacy-policy">
                  Terms & Privacy
                </Link>{" "}
                that you’re 13 or older and agree to receive emails and text messages from us with updates, content, and community news. You can
                opt out anytime — reply STOP to texts or Unsubscribe via email.
              </label>
            </div>
            {errors.consent ? (
              <p id="consent-error" className="text-sm text-red-600">
                {errors.consent}
              </p>
            ) : null}
          </div>

          {/* reCAPTCHA */}
          <div className="mt-2 space-y-2">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            />
            {errors.recaptcha ? (
              <p className="text-sm text-red-600">{errors.recaptcha}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="xl"
            disabled={isLoading}
            className="mt-2 text-xl h-[58px] md:h-[58px] w-[165px] gap-1.5"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

