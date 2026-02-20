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
import { X, Trash2 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const RemovePostDialog = ({ isOpen, onOpenChange, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[450px] w-[calc(100%-2rem)] p-0 overflow-hidden bg-white border-none rounded-[24px] shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="p-6 sm:p-10 flex flex-col items-center text-center relative">
          <DialogClose className="p-2 transition-colors rounded-full hover:bg-gray-100 absolute top-6 right-6">
            <X className="w-6 h-6 text-[#757575]" />
          </DialogClose>

          {/* Delete Icon */}
          <div className="w-[80px] h-[80px] bg-[#FFF1F3] rounded-full flex items-center justify-center mb-6 mt-4">
            <Trash2 className="w-10 h-10 text-[#FF4D4D]" />
          </div>

          <DialogTitle
            className={`${degular.className} text-[26px] text-[#24282E] mb-3`}
          >
            Remove Post
          </DialogTitle>
          <p className={`${inter.className} text-[16px] text-[#757575] mb-10`}>
            Are you sure you want to remove this post?
          </p>

          <div className="flex gap-4">
            <DialogClose asChild>
              <button
                className={`${inter.className} h-14 px-10 rounded-[16px] border border-[#E07386] text-[#E07386] text-[16px] font-semibold hover:bg-[#FFF5F7] transition-all`}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className={`${inter.className} h-14 px-8 rounded-[16px] bg-[#E07386] text-white text-[16px] font-semibold hover:bg-[#D06376] transition-all shadow-[0px_4px_15px_rgba(224,115,134,0.3)]`}
            >
              Yes, Remove
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemovePostDialog;
