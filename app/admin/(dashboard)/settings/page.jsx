"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const SettingsPage = () => {
  // State for the form, although not strictly needed for the layout demo
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading skeleton if preferred, but null prevents the mismatch entirely for now
  }

  return (
    <div className="p-4 lg:p-8 min-h-full bg-[#FFFFFF]">
      <div className="w-full max-w-[800px]">
        <h1
          className={`${degular.className} text-[32px] lg:text-[36px] text-[#24282E] mb-8`}
        >
          Settings
        </h1>

        <div className="mt-8">
          <h2 className="text-[18px] lg:text-[20px] font-bold text-[#24282E] mb-6">
            Personal Info
          </h2>

          <div className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="name"
                className="text-[#6C6C6C] font-medium text-[15px]"
              >
                Name
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[52px] rounded-[12px] border-[#E5E5E5] bg-white text-[15px] placeholder:text-[#B0B0B0]"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="email"
                className="text-[#6C6C6C] font-medium text-[15px]"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[52px] rounded-[12px] border-[#E5E5E5] bg-white text-[15px] placeholder:text-[#B0B0B0]"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="phone"
                className="text-[#6C6C6C] font-medium text-[15px]"
              >
                Phone
              </Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-[52px] rounded-[12px] border-[#E5E5E5] bg-white text-[15px] placeholder:text-[#B0B0B0]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="password"
                  className="text-[#6C6C6C] font-medium text-[15px]"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[52px] rounded-[12px] border-[#E5E5E5] bg-white text-[15px] placeholder:text-[#B0B0B0]"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-[#6C6C6C] font-medium text-[15px]"
                >
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-[52px] rounded-[12px] border-[#E5E5E5] bg-white text-[15px] placeholder:text-[#B0B0B0]"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button className="bg-[#E07386] hover:bg-[#D06376] text-white font-medium h-[48px] px-8 rounded-[12px] text-[15px] min-w-[160px]">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
