"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const EditPrivacyPolicyDialog = ({
  isOpen,
  onOpenChange,
  initialContent,
  onSave,
}) => {
  const [content, setContent] = useState(initialContent || "");

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent || "");
    }
  }, [isOpen, initialContent]);

  const handleSave = () => {
    onSave(content);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white border-none rounded-[24px] shadow-[0px_10px_50px_rgba(0,0,0,0.1)]">
        <div className="p-8">
          <DialogHeader className="flex flex-row items-center justify-between mb-6 space-y-0">
            <DialogTitle
              className={`${degular.className} text-[24px] text-[#24282E]`}
            >
              Edit Privacy Policy
            </DialogTitle>
            <DialogClose className="p-2 transition-colors rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-[#757575]" />
            </DialogClose>
          </DialogHeader>

          <div className="mb-8">
            <label
              className={`${inter.className} block text-[18px] text-[#8F8F8F] mb-3`}
            >
              Description
            </label>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${inter.className} w-full min-h-[350px] p-6 text-[15px] text-[#24282E] leading-relaxed border border-[#D5D5D5] rounded-[20px] focus:outline-none focus:border-[#E07386] transition-colors resize-none placeholder:text-[#B0B0B0]`}
                placeholder="Enter policy content..."
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <DialogClose asChild>
              <button
                className={`${inter.className} h-[48px] px-8 rounded-[12px] border border-[#E07386] text-[#E07386] text-[15px] font-semibold hover:bg-[#FFF5F7] transition-all`}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleSave}
              className={`${inter.className} h-[48px] px-8 rounded-[12px] bg-[#E07386] text-white text-[15px] font-semibold hover:bg-[#D06376] transition-all shadow-[0px_4px_15px_rgba(224,115,134,0.3)]`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPrivacyPolicyDialog;
