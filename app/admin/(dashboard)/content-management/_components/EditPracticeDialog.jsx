"use client";

import React from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { X, Play, Trash2, Check, X as XIcon } from "lucide-react";
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

const EditPracticeDialog = ({
  isOpen,
  onOpenChange,
  video,
  title,
  onDelete,
}) => {
  // Determine the preview image based on the title/tab
  const previewImage =
    title === "Soft Spark"
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=1200&q=80"
      : title === "Welcome To SundayGirl"
        ? "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?fit=crop&w=1200&q=80"
        : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fit=crop&w=1200&q=80";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] lg:max-w-[560px] h-auto lg:h-[657px] p-0 border border-[#F2F2F2] rounded-[20px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-6 lg:translate-x-0"
        showCloseButton={false}
      >
        {/* Accessibility */}
        <VisuallyHidden.Root>
          <DialogTitle>Edit {title}</DialogTitle>
          <DialogDescription>
            Edit video and details for {title}.
          </DialogDescription>
        </VisuallyHidden.Root>

        {/* Header */}
        <div className="px-8 py-6 border-b border-[#F2F2F2] flex items-center justify-between bg-white shrink-0">
          <h2 className={`${degular.className} text-[22px] text-[#24282E]`}>
            {title}
          </h2>
          <DialogClose asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F2F2F2] hover:bg-gray-50 transition-colors focus:outline-none">
              <X className="w-5 h-5 text-[#24282E]" />
            </button>
          </DialogClose>
        </div>

        {/* Content Area */}
        <div className="p-8 bg-white flex-1 overflow-y-auto">
          {/* Video Upload/Preview Section */}
          <div className="relative aspect-[16/9.5] rounded-[24px] overflow-hidden mb-8 group border border-[#F2F2F2]">
            <Image
              src={previewImage}
              alt="Practice Thumbnail"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 cursor-pointer hover:bg-white/30 transition-all">
                <Play className="w-7 h-7 fill-current" />
              </div>
              <p className="text-[18px] font-bold mb-1">File name here</p>
              <button className="text-[15px] font-medium underline underline-offset-4 hover:text-white/80 transition-colors">
                Change
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => {
                if (onDelete) onDelete(video);
              }}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#FF4D4D] shadow-lg hover:bg-[#FFF1F3] transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-[24px] border border-[#F2F2F2] p-6 flex items-center justify-between shadow-[0px_4px_30px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[16px] bg-[#FFF9E5] flex items-center justify-center shrink-0">
                {/* Custom Microphone Document Icon Mockup */}
                <div className="relative w-7 h-9 border-2 border-[#FFB800] rounded-[4px] flex items-center justify-center overflow-hidden">
                  <div className="absolute top-[-2px] right-[-2px] w-3 h-3 bg-[#FFF9E5] rotate-45 border-b-2 border-l-2 border-[#FFB800]"></div>
                  <div className="w-3 h-5 rounded-full border-2 border-[#FFB800]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-[#24282E] mb-1">
                  File name here
                </h4>
                <button className="text-[#E07386] text-[15px] font-bold hover:underline">
                  Change
                </button>
              </div>
            </div>
            <div className="text-[#4ADE80] text-[16px] font-bold">
              Uploading.... 80%
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#F2F2F2] bg-white flex items-center justify-end gap-3 shrink-0">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-50 text-[#6C6C6C] border-[#F2F2F2] rounded-[14px] h-[54px] px-8 flex items-center gap-2 font-bold transition-all text-[16px]"
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="w-5 h-5 text-[#FF4D4D]" />
            Discard
          </Button>
          <Button
            className="bg-[#E07386] hover:bg-[#d06376] text-white rounded-[14px] h-[54px] px-8 flex items-center gap-2 font-bold shadow-md transition-all text-[16px]"
            onClick={() => onOpenChange(false)}
          >
            <Check className="w-5 h-5" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPracticeDialog;
