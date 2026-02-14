"use client";

import React from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { X } from "lucide-react";
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

const UserDetailsDialog = ({ isOpen, onOpenChange, user, onRestrict }) => {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-[calc(100%-48px)] lg:max-w-[820px] p-0 border border-[#F2F2F2] rounded-[24px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white fixed left-auto right-6 top-6 lg:right-8 lg:top-8 translate-x-0 translate-y-0"
                showCloseButton={false}
            >
                {/* Accessibility */}
                <VisuallyHidden.Root>
                    <DialogTitle>View Details - {user.name}</DialogTitle>
                    <DialogDescription>
                        Detailed information about the user {user.name}.
                    </DialogDescription>
                </VisuallyHidden.Root>

                {/* Header */}
                <div className="px-10 py-7 border-b border-[#F2F2F2] flex items-center justify-between bg-white shrink-0">
                    <h2 className={`${degular.className} text-[24px] text-[#24282E]`}>View Details</h2>
                    <DialogClose asChild>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors focus:outline-none">
                            <X className="w-6 h-6 text-[#24282E]" />
                        </button>
                    </DialogClose>
                </div>

                {/* Content Area */}
                <div className="p-10 bg-white">
                    {/* Inner Card */}
                    <div className="border border-[#F2F2F2] rounded-[24px] p-10 flex gap-12 bg-white">
                        {/* User Details Left */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <p className="text-[16px] font-bold text-[#24282E] mb-6 self-start tracking-tight">User Details</p>
                            <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden mb-4 ring-1 ring-[#F2F2F2]">
                                <Image
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400&q=80"
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-[18px] font-bold text-[#24282E] mb-0.5">{user.name}</h3>
                            <p className="text-[14px] text-[#8F8F8F] font-medium">{user.phone}</p>
                        </div>

                        {/* Divider */}
                        <div className="w-[1px] bg-[#E3F2EE] ml-2 mr-2 self-stretch my-6"></div>

                        {/* Info Details Right */}
                        <div className="flex-1 pt-2">
                            <p className="text-[16px] font-bold text-[#24282E] mb-8 tracking-tight">Info Details</p>

                            <div className="grid grid-cols-3 gap-10">
                                <div>
                                    <p className="text-[15px] font-medium text-[#8F95B2] mb-2">Date Joined</p>
                                    <p className="text-[16px] font-bold text-[#24282E] uppercase tracking-wide">
                                        {user.dateJoined === "10/12/2022" ? "26 October 2024" : user.dateJoined}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-medium text-[#8F95B2] mb-2">Practices Joined</p>
                                    <p className="text-[16px] font-bold text-[#24282E]">{user.practices || "12"}</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-medium text-[#8F95B2] mb-2">Account Status</p>
                                    <p className="text-[16px] font-bold text-[#24282E]">{user.status || "Active"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-10 py-8 border-t border-[#F2F2F2] bg-white flex items-center justify-end gap-3 shrink-0">
                    <Button
                        variant="outline"
                        className="border-[#E07386] text-[#E07386] hover:bg-[#FFF5F6] rounded-[16px] h-14 px-8 font-bold transition-all text-[15px]"
                        onClick={() => {
                            if (onRestrict) onRestrict(user);
                        }}
                    >
                        Restrict User
                    </Button>
                    <Button
                        className="bg-[#E07386] hover:bg-[#d06376] text-white rounded-[16px] h-14 px-10 font-bold shadow-md transition-all text-[15px]"
                        onClick={() => onOpenChange(false)}
                    >
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailsDialog;
