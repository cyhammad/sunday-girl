"use client";

import React from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, CheckCheck, SquarePen } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const NotificationSuccessDialog = ({
  isOpen,
  onOpenChange,
  onAddNew,
  notification,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[420px] w-[calc(100%-2rem)] p-0 overflow-hidden bg-white border-none rounded-[24px] shadow-[0px_10px_50px_rgba(0,0,0,0.12)] duration-300"
      >
        <div className="p-8 flex flex-col items-center text-center relative">
          <DialogClose className="p-2 transition-colors rounded-full hover:bg-gray-100 absolute top-4 right-4">
            <X className="w-5 h-5 text-[#757575]" />
          </DialogClose>

          {/* Success Icon */}
          <div className="w-[80px] h-[80px] bg-[#FAFAFA] rounded-full flex items-center justify-center mb-5 mt-2">
            <CheckCheck className="w-8 h-8 text-[#24282E]" />
          </div>

          <DialogTitle
            className={`${degular.className} text-[24px] text-[#24282E] mb-2`}
          >
            Bulk Notification Sent
          </DialogTitle>
          <p
            className={`${inter.className} text-[15px] text-[#757575] mb-6 leading-relaxed px-4`}
          >
            Your notification has been sent to all users.
          </p>

          {/* Notification Preview Card */}
          <div className="w-full bg-white border border-[#F2F2F2] rounded-[24px] p-4 mb-8 flex items-center gap-4 shadow-[0px_2px_12px_rgba(0,0,0,0.02)]">
            <div className="w-[64px] h-[64px] bg-[#FFF5F7] rounded-[16px] flex items-center justify-center shrink-0">
              <SquarePen className="w-6 h-6 text-[#E07386]" />
            </div>
            <div className="flex flex-col items-start text-left gap-0.5">
              <h4 className="text-[16px] font-bold text-[#24282E] truncate w-full">
                {notification?.title || "New Content"}
              </h4>
              <p className="text-[14px] text-[#757575] line-clamp-2">
                {notification?.description ||
                  "Your new content is ready to view!"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onAddNew}
              className={`${inter.className} flex-1 h-[48px] px-4 rounded-[12px] border border-[#E07386] text-[#E07386] text-[15px] font-semibold hover:bg-[#FFF5F7] transition-all whitespace-nowrap`}
            >
              Add New
            </button>
            <DialogClose asChild>
              <button
                className={`${inter.className} flex-1 h-[48px] px-4 rounded-[12px] bg-[#E07386] text-white text-[15px] font-semibold hover:bg-[#D06376] transition-all shadow-[0px_4px_15px_rgba(224,115,134,0.3)]`}
              >
                Home
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSuccessDialog;
