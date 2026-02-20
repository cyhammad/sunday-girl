"use client";

import React from "react";
import localFont from "next/font/local";
import { X, CloudUpload } from "lucide-react";
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

const UploadVideoDialog = ({ isOpen, onOpenChange, type }) => {
  const isWelcome = type === "Welcome To SundayGirl";
  const title = isWelcome ? "Upload Welcome Video" : "Upload Soft spark video";
  const descriptionText = isWelcome
    ? "Upload the 'Welcome to SundayGirl' video to introduce new users to our platform."
    : "Upload the 'Soft Spark' video to introduce new users to our platform.";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] lg:max-w-[700px] h-auto max-h-[95vh] p-0 border-0 rounded-[24px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white"
        showCloseButton={false}
      >
        {/* Accessibility */}
        <VisuallyHidden.Root>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Step to upload a new {type?.toLowerCase() || "video"} to the
            platform.
          </DialogDescription>
        </VisuallyHidden.Root>

        {/* Header */}
        <div className="px-6 sm:px-10 py-6 sm:py-8 flex items-center justify-between bg-white shrink-0">
          <h2 className={`${degular.className} text-[28px] text-[#24282E]`}>
            {title}
          </h2>
          <DialogClose asChild>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
              <X className="w-6 h-6 text-[#24282E]" />
            </button>
          </DialogClose>
        </div>

        {/* Content Area */}
        <div className="px-6 sm:px-10 pb-2 bg-white flex-1 overflow-y-auto">
          <div className="mb-8">
            <label className="block text-[18px] font-medium text-[#6C6C6C] mb-3">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter"
              className="w-full h-16 px-6 rounded-[16px] border border-[#E5E7EB] focus:border-[#E07386] focus:ring-1 focus:ring-[#E07386] outline-none transition-all placeholder:text-[#9CA3AF] text-[16px]"
            />
          </div>

          {/* Upload Box */}
          <div className="border-2 border-dashed border-[#E5E7EB] rounded-[24px] py-10 sm:py-16 px-6 sm:px-10 flex flex-col items-center justify-center text-center bg-white group cursor-pointer hover:border-[#E07386] transition-colors">
            <div className="w-20 h-20 rounded-full bg-[#F9FAFB] flex items-center justify-center mb-6 group-hover:bg-[#FFF1F3] transition-colors">
              <CloudUpload className="w-10 h-10 text-[#24282E] group-hover:text-[#E07386] transition-colors" />
            </div>
            <h3 className="text-[20px] font-bold text-[#24282E] mb-3">
              Upload Video
            </h3>
            <p className="text-[#8F8F8F] text-[16px] max-w-[480px] leading-relaxed">
              {descriptionText}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-10 bg-white flex items-center justify-end gap-3 sm:gap-4 shrink-0">
          <Button
            variant="outline"
            className="bg-white hover:bg-[#FFF1F3] text-[#E07386] border-[#E07386] rounded-[16px] h-16 px-10 font-bold text-[18px] transition-all min-w-[140px]"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#E07386] hover:bg-[#d06376] text-white border-0 rounded-[16px] h-16 px-10 font-bold text-[18px] shadow-lg shadow-[#E07386]/20 transition-all min-w-[180px]"
            onClick={() => onOpenChange(false)}
          >
            Upload Video
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideoDialog;
