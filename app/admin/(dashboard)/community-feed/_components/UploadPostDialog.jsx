"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, CloudUpload } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const UploadPostDialog = ({ isOpen, onOpenChange, onUpload }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = () => {
    onUpload({ title, description });
    onOpenChange(false);
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-6 lg:top-6 lg:translate-x-0 lg:translate-y-0 w-[calc(100%-2rem)] sm:max-w-[420px] p-0 overflow-hidden bg-white border-none rounded-[24px] shadow-[0px_10px_50px_rgba(0,0,0,0.12)] duration-300"
      >
        <div className="p-8">
          <DialogHeader className="flex flex-row items-center justify-between mb-6 space-y-0">
            <DialogTitle
              className={`${degular.className} text-[22px] text-[#24282E]`}
            >
              View Post
            </DialogTitle>
            <DialogClose className="p-2 transition-colors rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-[#757575]" />
            </DialogClose>
          </DialogHeader>

          <div className="space-y-5">
            {/* Title Input */}
            <div>
              <label
                className={`${inter.className} block text-[16px] font-medium text-[#8F8F8F] mb-2`}
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter"
                className="w-full h-[48px] px-4 text-[15px] text-[#24282E] border border-[#D5D5D5] rounded-[12px] focus:outline-none focus:border-[#E07386] transition-colors placeholder:text-[#B0B0B0]"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label
                className={`${inter.className} block text-[16px] font-medium text-[#8F8F8F] mb-2`}
              >
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter"
                className="w-full h-[120px] p-4 text-[15px] text-[#24282E] border border-[#D5D5D5] rounded-[12px] focus:outline-none focus:border-[#E07386] transition-colors resize-none placeholder:text-[#B0B0B0]"
              />
            </div>

            {/* File Upload Area */}
            <div className="relative group cursor-pointer">
              <div className="w-full aspect-[2.4/1] border-2 border-dashed border-[#D5D5D5] rounded-[16px] flex flex-col items-center justify-center gap-1.5 group-hover:border-[#E07386] transition-colors bg-[#FAFAFA]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#24282E]">
                  <CloudUpload className="w-5 h-5" />
                </div>
                <span
                  className={`${inter.className} text-[16px] font-semibold text-[#24282E]`}
                >
                  Select File
                </span>
                <span
                  className={`${inter.className} text-[13px] text-[#8F8F8F] text-center px-4`}
                >
                  Share your thoughts with the Community Feed
                </span>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <DialogClose asChild>
              <button
                className={`${inter.className} h-11 px-8 rounded-[12px] border border-[#E07386] text-[#E07386] text-[15px] font-semibold hover:bg-[#FFF5F7] transition-all`}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleUpload}
              className={`${inter.className} h-11 px-8 rounded-[12px] bg-[#E07386] text-white text-[15px] font-semibold hover:bg-[#D06376] transition-all shadow-[0px_4px_15px_rgba(224,115,134,0.3)]`}
            >
              Upload Video
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPostDialog;
