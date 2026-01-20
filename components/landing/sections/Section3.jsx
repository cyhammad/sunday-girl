"use client";

import React, { useState } from "react";
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

const Section3 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    wantMore: "",
    consent: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      firstName: "",
      email: "",
      phone: "",
      wantMore: "",
      consent: false,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, wantMore: value }));
  };

  const handleConsentChange = (checked) => {
    setFormData((prev) => ({ ...prev, consent: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!formData.consent) {
      toast.error("Please agree to the terms to continue");
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
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
          className="w-full h-full object-cover"
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
              className="w-full rounded-md placeholder:text-[#999DA0]"
            />
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
              className="w-full rounded-md placeholder:text-[#999DA0]"
            />
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
          <div className="flex items-start gap-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={handleConsentChange}
              disabled={isLoading}
              className="mt-0.75"
            />
            <label htmlFor="consent" className="text-[14px] leading-tight text-[#414141] font-normal">
              By clicking <strong>Submit</strong>, you confirm you're{" "}
              <strong>13 or older</strong> and agree to receive emails and text
              messages from us with updates, content, and community news. You
              can opt out anytime — reply STOP to texts or Unsubscribe via
              email.
            </label>
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

