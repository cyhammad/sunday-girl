"use client";

import React from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { X } from "lucide-react";
import { CloudUploadIcon } from "@/components/icons/icons";
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

const UploadSoftSparkVideoDialog = ({ isOpen, onOpenChange }) => {
  const title = "Upload Soft spark video";
  const explanation =
    "Upload the 'Soft Spark' video to introduce new users to our platform.";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] lg:max-w-[560px] h-auto max-h-[95vh] p-0 border-0 rounded-[20px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white"
        showCloseButton={false}
      >
        <VisuallyHidden.Root>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Step to upload a new soft spark video to the platform.
          </DialogDescription>
        </VisuallyHidden.Root>

        <div className="px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between bg-white shrink-0">
          <h2
            className={`${inter.className} text-[24px] font-bold text-[#24282E]`}
          >
            {title}
          </h2>
          <DialogClose asChild>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
              <X className="w-6 h-6 text-[#24282E]" />
            </button>
          </DialogClose>
        </div>

        <div className="px-5 sm:px-8 pb-2 bg-white flex-1 overflow-y-auto">
          <div className="mb-6">
            <label className="block text-[15px] font-medium text-[#6C6C6C] mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter"
              className="w-full h-13 px-5 rounded-[12px] border border-[#E5E7EB] focus:border-[#E07386] focus:ring-1 focus:ring-[#E07386] outline-none transition-all placeholder:text-[#9CA3AF] text-[14px]"
            />
          </div>

          <div className="border-2 border-dashed border-[#E5E7EB] rounded-[20px] py-8 sm:py-12 px-5 sm:px-8 flex flex-col items-center justify-center text-center bg-white group cursor-pointer hover:border-[#E07386] transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#F9FAFB] flex items-center justify-center mb-5 group-hover:bg-[#FFF1F3] transition-colors">
              <CloudUploadIcon className="w-8 h-8 text-[#24282E] group-hover:text-[#E07386] transition-colors" />
            </div>
            <p
              className={`${inter.className} text-[#61616C] text-[14px] max-w-[400px] leading-relaxed`}
            >
              {explanation}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-8 bg-white flex items-center justify-end gap-3 shrink-0">
          <Button
            variant="outline"
            className="bg-white hover:bg-[#FFF1F3] text-[#E07386] border-[#E07386] rounded-[12px] h-12 text-[15px]"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#E07386] hover:bg-[#d06376] text-white border-0 rounded-[12px] h-12 px-4 text-[15px]"
            onClick={() => onOpenChange(false)}
          >
            Upload Video
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadSoftSparkVideoDialog;
