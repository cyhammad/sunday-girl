"use client";

import React from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { X } from "lucide-react";
import { TrashIcon } from "@/components/icons/icons";
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

const DeletePracticeVideoDialog = ({
  isOpen,
  onOpenChange,
  video,
  onDelete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] sm:max-w-[480px] p-0 border-0 rounded-[12px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white"
        showCloseButton={false}
      >
        {/* Accessibility */}
        <VisuallyHidden.Root>
          <DialogTitle>Delete Practice Video</DialogTitle>
          <DialogDescription>
            Confirmation to delete the practice video named {video?.name}.
          </DialogDescription>
        </VisuallyHidden.Root>

        {/* Close Button Header */}
        <div className="p-3 flex justify-end shrink-0">
          <DialogClose asChild>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
              <X className="w-5 h-5 text-[#24282E]" />
            </button>
          </DialogClose>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center">
            <TrashIcon className="w-8 h-8 text-[#F55555]" />
          </div>

          <h2
            className={`${degular.className} text-[18px] text-[#24282E] mb-2`}
          >
            Delete Practice Video
          </h2>

          <p
            className={`${inter.className} text-[#8F8F8F] text-[15px] leading-relaxed mb-8`}
          >
            Are you sure you want to delete{" "}
            <span className="text-[#24282E] font-semibold">
              {video?.name || "this"}
            </span>{" "}
            practice video?
          </p>

          <div className="flex items-center gap-3 w-full justify-center">
            <Button
              variant="outline"
              className={`${inter.className} bg-white hover:bg-[#FFF1F3] text-[#E07386] border-[#E07386] rounded-[12px] h-12 px-6 text-[15px] transition-all min-w-[125px]`}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className={`${inter.className} bg-[#E07386] hover:bg-[#d06376] text-white border-0 rounded-[12px] h-12 px-6 text-[15px] shadow-sm transition-all min-w-[125px]`}
              onClick={() => {
                if (onDelete) onDelete(video);
                onOpenChange(false);
              }}
            >
              Yes Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePracticeVideoDialog;
