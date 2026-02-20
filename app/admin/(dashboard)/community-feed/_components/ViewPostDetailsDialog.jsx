"use client";

import React from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Play } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const ViewPostDetailsDialog = ({ isOpen, onOpenChange, post, onRemove }) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-6 lg:top-6 lg:translate-x-0 lg:translate-y-0 w-[calc(100%-2rem)] sm:max-w-[420px] p-0 overflow-hidden bg-white border-none rounded-[24px] shadow-[0px_10px_50px_rgba(0,0,0,0.12)] duration-300"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-8 py-5 border-b border-[#F2F2F2] flex items-center justify-between">
            <DialogTitle
              className={`${degular.className} text-[22px] text-[#24282E]`}
            >
              View Post
            </DialogTitle>
            <DialogClose className="p-2 transition-colors rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-[#757575]" />
            </DialogClose>
          </div>

          <div className="p-8 space-y-6 overflow-y-auto max-h-[75vh]">
            {/* User Info Card */}
            <div className="bg-white border border-[#EEEEEE] rounded-[16px] p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#EEEEEE]">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#24282E] text-[16px] leading-tight">
                    {post.user.name}
                  </span>
                  <span className="text-[#8F8F8F] text-[13px]">
                    {post.user.time}
                  </span>
                </div>
              </div>

              <p className="text-[#525252] text-[14px] leading-relaxed mb-6">
                {post.content}
              </p>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <span className="text-[#8F8F8F] text-[12px] mb-0.5">
                    Created on
                  </span>
                  <span className="text-[#24282E] font-bold text-[14px]">
                    10/12/2023
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8F8F8F] text-[12px] mb-0.5">
                    Likes
                  </span>
                  <span className="text-[#24282E] font-bold text-[14px]">
                    {post.likes}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8F8F8F] text-[12px] mb-0.5">
                    Comments
                  </span>
                  <span className="text-[#24282E] font-bold text-[14px]">
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>

            {/* Media Area */}
            <div className="relative aspect-[16/11] rounded-[16px] overflow-hidden bg-gray-100 shadow-sm">
              <img
                src={post.image}
                alt="Post media"
                className="w-full h-full object-cover"
              />
              {post.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-[#F2F2F2] flex justify-end gap-4 bg-white">
            <button
              onClick={() => {
                onRemove?.(post.id);
                onOpenChange(false);
              }}
              className={`${inter.className} h-11 px-6 rounded-[12px] border border-[#E07386] text-[#E07386] text-[15px] font-semibold hover:bg-[#FFF5F7] transition-all`}
            >
              Remove Post
            </button>
            <DialogClose asChild>
              <button
                className={`${inter.className} h-11 px-8 rounded-[12px] bg-[#E07386] text-white text-[15px] font-semibold hover:bg-[#D06376] transition-all shadow-[0px_4px_15px_rgba(224,115,134,0.3)]`}
              >
                Done
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPostDetailsDialog;
