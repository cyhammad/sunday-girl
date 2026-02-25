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
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X, CheckCheck } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const PostSuccessDialog = ({ isOpen, onOpenChange, onAddNewPost }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[450px] p-0 overflow-hidden bg-white border-none rounded-[24px] shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="p-8 sm:p-12 flex flex-col items-center text-center relative">
          <DialogClose className="p-2 transition-colors rounded-full hover:bg-gray-100 absolute top-6 right-6">
            <X className="w-5 h-5 text-[#24282E]" />
          </DialogClose>

          {/* Success Icon */}
          <div className="w-[84px] h-[84px] bg-[#FAFAFA] rounded-full flex items-center justify-center mb-6 mt-4">
            <CheckCheck className="w-8 h-8 text-[#24282E]" strokeWidth={2.5} />
          </div>

          <DialogTitle
            className={`${inter.className} text-[24px] font-bold text-[#24282E] mb-2`}
          >
            Post Added
          </DialogTitle>
          <p
            className={`${inter.className} text-[18px] text-[#757575] mb-10 max-w-[320px] leading-relaxed`}
          >
            Your post has been added successfully.
          </p>

          <div className="flex items-center justify-center gap-4 w-full">
            <button
              onClick={onAddNewPost}
              className={`${inter.className} h-[52px] px-8 rounded-[16px] border border-[#E07386] text-[#E07386] text-[16px] font-bold hover:bg-[#FFF5F7] transition-all min-w-[170px]`}
            >
              Add New Post
            </button>
            <DialogClose asChild>
              <button
                className={`${inter.className} h-[52px] px-10 rounded-[16px] bg-[#E07386] text-white text-[16px] font-bold hover:bg-[#D06376] transition-all shadow-[0px_4px_15px_rgba(224,115,134,0.3)] min-w-[120px]`}
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

export default PostSuccessDialog;
