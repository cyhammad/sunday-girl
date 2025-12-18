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

const Section3 = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 self-center max-w-360">
      <Image
        src="/3.png"
        alt="Lifestyle photograph"
        width={708}
        height={759}
        className=""
        priority
      />

      {/* Right Panel - Form */}
      <div className="flex-1 bg-white rounded-2xl flex flex-col w-full items-center justify-center p-8 lg:p-12 xl:p-16">
        <h2 className="text-2xl font-semibold leading-tight text-black mb-10">
          If this sounds like your kind of vibe, the waitlist is open. You'll
          fit right in.
        </h2>
        {/* Form */}
        <form className="flex flex-col w-full gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter"
              className="w-full rounded-md"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter"
              className="w-full rounded-md"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter"
              className="w-full rounded-md"
            />
          </div>

          {/* Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="heart">What's on your heart?</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Soulmate</SelectItem>
                <SelectItem value="option2">Friend</SelectItem>
                <SelectItem value="option3">Family</SelectItem>
                <SelectItem value="option4">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <ImSoInButton size="xl" />
          </div>
          <p className="text-start font-semibold text-secondary-foreground">
            We saved you a seat. Welcome in.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Section3;
