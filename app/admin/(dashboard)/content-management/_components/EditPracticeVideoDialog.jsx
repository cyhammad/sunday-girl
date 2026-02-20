"use client";

import React from "react";
import localFont from "next/font/local";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
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

const EditPracticeVideoDialog = ({ isOpen, onOpenChange, video, onDelete }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] lg:max-w-[700px] h-auto max-h-[95vh] p-0 border-0 rounded-[24px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white"
        showCloseButton={false}
      >
        {/* Accessibility */}
        <VisuallyHidden.Root>
          <DialogTitle>Edit Practice Video</DialogTitle>
          <DialogDescription>
            Form to edit the practice video details including title, description
            and video file.
          </DialogDescription>
        </VisuallyHidden.Root>

        {/* Header */}
        <div className="px-6 sm:px-10 py-6 sm:py-8 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
            <h2 className={`${degular.className} text-[28px] text-[#24282E]`}>
              Edit Practice Video
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onDelete) onDelete(video);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F2F2F2] hover:bg-[#FFF1F3] text-[#FF4D4D] transition-colors focus:outline-none"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <DialogClose asChild>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F2F2F2] hover:bg-gray-100 transition-colors focus:outline-none">
                <X className="w-6 h-6 text-[#24282E]" />
              </button>
            </DialogClose>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 sm:px-10 pb-2 bg-white flex-1 overflow-y-auto">
          <div className="mb-6">
            <label className="block text-[18px] font-medium text-[#6C6C6C] mb-3">
              Title
            </label>
            <input
              type="text"
              defaultValue={video?.name || "Sky High"}
              placeholder="Enter"
              className="w-full h-16 px-6 rounded-[16px] border border-[#E5E7EB] focus:border-[#E07386] focus:ring-1 focus:ring-[#E07386] outline-none transition-all placeholder:text-[#9CA3AF] text-[16px]"
            />
          </div>

          <div className="mb-8">
            <label className="block text-[18px] font-medium text-[#6C6C6C] mb-3">
              Description
            </label>
            <textarea
              defaultValue={
                video?.description ||
                "A video tutorial on how to improve your vertical jump. Learn the techniques from coach Sadora. Filmed in the Ascent gym."
              }
              placeholder="Enter"
              rows={4}
              className="w-full px-6 py-4 rounded-[16px] border border-[#E5E7EB] focus:border-[#E07386] focus:ring-1 focus:ring-[#E07386] outline-none transition-all placeholder:text-[#9CA3AF] text-[16px] resize-none"
            />
          </div>

          {/* Preview Area */}
          <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden mb-8 border border-[#E5E7EB] group">
            <Image
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fit=crop&w=1200&q=80"
              alt="Practice Video Thumbnail"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
              <h3 className="text-[20px] font-bold mb-2">Practice Video</h3>
              <button className="text-[16px] font-medium underline underline-offset-4 hover:text-white/80 transition-colors">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-10 bg-white flex items-center justify-end gap-4 shrink-0">
          <Button
            variant="outline"
            className="bg-white hover:bg-[#FFF1F3] text-[#E07386] border-[#E07386] rounded-[16px] h-16 px-10 font-bold text-[18px] transition-all min-w-[140px]"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#E07386] hover:bg-[#d06376] text-white border-0 rounded-[16px] h-16 px-10 font-bold text-[18px] shadow-lg shadow-[#E07386]/20 transition-all min-w-[200px]"
            onClick={() => onOpenChange(false)}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPracticeVideoDialog;
