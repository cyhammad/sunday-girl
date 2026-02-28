"use client";

import React from "react";
import localFont from "next/font/local";
import { X, Plus } from "lucide-react";
import { Inter } from "next/font/google";
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

const PinPostDialog = ({ isOpen, onOpenChange, post, onConfirm }) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] sm:max-w-[450px] p-6 sm:p-10 border-0 rounded-[24px] overflow-hidden flex flex-col items-center gap-0 shadow-2xl bg-white"
        showCloseButton={false}
      >
        {/* Accessibility */}
        <VisuallyHidden.Root>
          <DialogTitle>Add As SoftSpark?</DialogTitle>
          <DialogDescription>
            Confirmation to add this post to SoftSpark.
          </DialogDescription>
        </VisuallyHidden.Root>

        {/* Close Button */}
        <div className="absolute top-6 right-6">
          <DialogClose asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
              <X className="w-6 h-6 text-[#8F95B2]" />
            </button>
          </DialogClose>
        </div>

        {/* Icon Container */}
        <div className="w-24 h-24 rounded-full bg-[#FAFAFA] flex items-center justify-center mb-6 mt-4">
          <Plus className="w-10 h-10 text-[#24282E]" />
        </div>

        {/* Content */}
        <h2
          className={`${inter.className} text-[26px] font-bold text-[#24282E] mb-3 text-center tracking-tight`}
        >
          Add As SoftSpark?
        </h2>
        <p
          className={`${inter.className} text-[16px] text-[#6C6C6C] text-center mb-10 max-w-[380px] leading-relaxed`}
        >
          Are you sure you want to add this video to SoftSpark?
        </p>

        {/* Footer / Buttons */}
        <div className="flex items-center justify-center gap-4 w-full">
          <Button
            variant="outline"
            className={`${inter.className} flex-1 border-[#E07386] text-[#E07386] hover:bg-[#FFF5F6] rounded-[16px] h-14 font-bold text-[16px] transition-all`}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className={`${inter.className} flex-1 bg-[#E07386] hover:bg-[#d06376] text-white rounded-[16px] h-14 font-bold text-[16px] shadow-lg shadow-[#E07386]/20 transition-all border-0`}
            onClick={() => {
              if (onConfirm) onConfirm(post);
              onOpenChange(false);
            }}
          >
            Yes, Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PinPostDialog;
