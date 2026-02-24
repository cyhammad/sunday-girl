"use client";

import React from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";

const degular = localFont({
  src: "../../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const inter = Inter({ subsets: ["latin"] });

const UserDetailsDialog = ({ isOpen, onOpenChange, user, onRestrict }) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] lg:max-w-[880px] lg:h-[428px] p-0 border border-[#F2F2F2] rounded-[20px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-8 lg:top-8 lg:translate-x-0 lg:translate-y-0"
        showCloseButton={false}
      >
        {/* Accessibility */}
        <VisuallyHidden.Root>
          <DialogTitle>View Details - {user.name}</DialogTitle>
          <DialogDescription>
            Detailed information about the user {user.name}.
          </DialogDescription>
        </VisuallyHidden.Root>

        {/* Header */}
        <div className="px-8 py-5 border-b border-[#F2F2F2] flex items-center justify-between bg-white shrink-0">
          <h2 className={`${degular.className} text-[24px] text-[#24282E]`}>
            View Details
          </h2>
          <DialogClose asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors focus:outline-none">
              <X className="w-6 h-6 text-[#24282E]" />
            </button>
          </DialogClose>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:px-10 sm:py-9 bg-white flex-1 flex items-center min-h-0">
          {/* Inner Card */}
          <div className="w-full border border-[#F2F2F2] rounded-[20px] p-6 sm:px-10 sm:py-8 flex flex-col sm:flex-row gap-8 sm:gap-12 bg-white min-h-0 items-center sm:items-stretch">
            {/* User Details Left */}
            <div className="flex flex-col items-center sm:items-start sm:min-w-[140px]">
              <p
                className={`${inter.className} text-[15px] font-bold text-[#24282e] mb-6 tracking-tight`}
              >
                User Details
              </p>
              <div className="flex flex-col items-center sm:items-center">
                <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden mb-4 ring-1 ring-[#F2F2F2]">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400&q=80"
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3
                  className={`${inter.className} text-[16px] font-bold text-[#24282E] mb-1`}
                >
                  {user.name}
                </h3>
                <p
                  className={`${inter.className} text-[14px] text-[#8F95B2] font-medium`}
                >
                  {user.phone}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] bg-[#E3F2EE] ml-2 mr-2 self-stretch my-6"></div>

            {/* Info Details Right */}
            <div className="flex-1 pt-0">
              <p
                className={`${inter.className} text-[15px] font-bold text-[#24282e] mb-8 tracking-tight`}
              >
                Info Details
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-14">
                <div className="flex flex-col gap-2">
                  <p
                    className={`${inter.className} text-[14px] font-medium text-[#8F95B2]`}
                  >
                    Date Joined
                  </p>
                  <p
                    className={`${inter.className} text-[15px] font-bold text-[#24282E] leading-tight`}
                  >
                    {user.dateJoined === "10/12/2022"
                      ? "26 October 2024"
                      : user.dateJoined}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    className={`${inter.className} text-[14px] font-medium text-[#8F95B2]`}
                  >
                    Practices Joined
                  </p>
                  <p
                    className={`${inter.className} text-[15px] font-bold text-[#24282E] leading-tight`}
                  >
                    {user.practices || "12"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    className={`${inter.className} text-[14px] font-medium text-[#8F95B2]`}
                  >
                    Account Status
                  </p>
                  <p
                    className={`${inter.className} text-[15px] font-bold text-[#24282E] leading-tight`}
                  >
                    {user.status || "Active"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 pb-8 pt-0 bg-white flex items-center justify-end gap-3 shrink-0">
          <Button
            variant="outline"
            className={`${inter.className} border-[#E07386] text-[#E07386] hover:bg-[#FFF5F6] rounded-[16px] h-[48px] px-8 font-semibold transition-all text-[15px]`}
            onClick={() => {
              if (onRestrict) onRestrict(user);
            }}
          >
            Restrict User
          </Button>
          <Button
            className={`${inter.className} bg-[#E07386] hover:bg-[#d06376] text-white rounded-[16px] h-[48px] px-10 font-semibold shadow-none transition-all text-[15px]`}
            onClick={() => onOpenChange(false)}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
