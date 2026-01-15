"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImSoInButton from "@/components/landing/buttons/ImSoInButton";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const Section3 = () => {
  const wantOptions = [
    { value: "joy", label: "Joy" },
    { value: "connection", label: "Connection" },
    { value: "confidence", label: "Confidence" },
    { value: "clarity", label: "Clarity" },
    { value: "motivation", label: "Motivation" },
    { value: "other", label: "Other" },
  ];
  return (
    <div className="grid lg:grid-cols-2 sm:gap-9 gap-4 self-center max-w-360">
      <div className="relative rounded-2xl min-h-[389px] sm:min-h-auto overflow-hidden">
        <Image
          src="/sec-3.png"
          alt="Lifestyle photograph"
          width={708}
          height={759}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 bg-white rounded-2xl flex flex-col w-full items-center justify-center gap-6 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#2A2A2A]">
          If this sounds like your kind of vibe, the waitlist is open. You'll
          fit right <br /> in.
        </h2>
        {/* Form */}
        <form className="flex flex-col w-full gap-5">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter"
              className="w-full rounded-md text-[#999DA0]"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter"
              className="w-full rounded-md text-[#999DA0]"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter"
              className="w-full rounded-md text-[#999DA0]"
            />
          </div>

          {/* Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="heart">What do you want more of?</Label>
            <Select>
              <SelectTrigger className="w-full">
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
            <Checkbox id="consent" className="mt-0.75" />
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
            size="xl"
            className="mt-2 sm:text-xl h-[53px] w-[143px] sm:h-[58px] sm:w-[163px] gap-1.5"
          >
            I'm so in
            <Image
              src="/arrow.png"
              quality={100}
              width={24}
              height={24}
              className="size-3 sm:size-4.5"
              alt="Arrow"
            />
          </Button>
          <p className="text-start text-lg font-semibold text-secondary-foreground">
            We saved you a seat. Welcome in.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Section3;
