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
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:max-w-[420px] p-0 overflow-hidden bg-white border-none rounded-[24px] shadow-[0px_10px_50px_rgba(0,0,0,0.12)] duration-300"
      >
        <div className="flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 shrink-0">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0">
              <DialogTitle
                className={`${inter.className} text-[24px] font-bold text-[#24282E]`}
              >
                View Post
              </DialogTitle>
              <DialogClose className="p-2 transition-colors rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-[#24282E]" />
              </DialogClose>
            </DialogHeader>
          </div>

          {/* Scrollable Content */}
          <div className="px-8 py-0 overflow-y-auto">
            <div className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label
                  className={`${inter.className} block text-[18px] font-medium text-[#757575]`}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter"
                  className="w-full h-[54px] px-5 text-[15px] text-[#24282E] border border-[#E5E7EB] rounded-[16px] focus:outline-none focus:border-[#E07386] transition-colors placeholder:text-[#B0B0B0]"
                />
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label
                  className={`${inter.className} block text-[18px] font-medium text-[#757575]`}
                >
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter"
                  className="w-full h-[220px] p-5 text-[15px] text-[#24282E] border border-[#E5E7EB] rounded-[16px] focus:outline-none focus:border-[#E07386] transition-colors resize-none placeholder:text-[#B0B0B0]"
                />
              </div>

              {/* File Upload Area */}
              <div className="relative group cursor-pointer space-y-2">
                <div className="w-full py-8 border-2 border-dashed border-[#DFDFDF] rounded-[16px] flex flex-col items-center justify-center gap-2 group-hover:border-[#E07386] transition-colors bg-white">
                  <div className="w-[56px] h-[56px] rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#24282E]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 17.5C18.4205 17.5 19.1667 16.7538 19.1667 15.8333C19.1667 14.9128 18.4205 14.1667 17.5 14.1667C16.5795 14.1667 15.8333 14.9128 15.8333 15.8333C15.8333 16.7538 16.5795 17.5 17.5 17.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12V19M12 12L9 15M12 12L15 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.3333 12C21.4379 12 22.3333 11.1046 22.3333 10C22.3333 8.89543 21.4379 8 20.3333 8C20.1834 8 20.0381 8.01639 19.8981 8.04758C19.4623 5.75347 17.4539 4 15.0417 4C13.4359 4 12.0162 4.77708 11.125 5.96131C10.7495 5.82348 10.3418 5.75 9.91667 5.75C7.8446 5.75 6.16667 7.42793 6.16667 9.5C6.16667 9.56306 6.16823 9.62575 6.17133 9.68802C4.16016 10.3235 2.66667 12.2131 2.66667 14.4583C2.66667 17.2001 5.3887 19.4167 8.16667 19.4167"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className={`${inter.className} text-[18px] font-bold text-[#24282E]`}
                  >
                    Select File
                  </span>
                  <span
                    className={`${inter.className} text-[15px] text-[#757575] text-center px-8`}
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
          </div>

          {/* Action Buttons Footer */}
          <div className="px-8 pb-10 pt-8 shrink-0">
            <div className="flex justify-center gap-4">
              <DialogClose asChild>
                <button
                  className={`${inter.className} h-[52px] px-10 rounded-[16px] border border-[#E07386] text-[#E07386] text-[16px] font-bold hover:bg-[#FFF5F7] transition-all min-w-[130px]`}
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                onClick={handleUpload}
                className={`${inter.className} h-[52px] px-10 rounded-[16px] bg-[#E07386] text-white text-[16px] font-bold hover:bg-[#D06376] transition-all shadow-[0px_4px_15px_rgba(224,115,134,0.3)] min-w-[180px]`}
              >
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPostDialog;
