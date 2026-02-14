"use client";

import React from "react";
import localFont from "next/font/local";
import { X, LogOut } from "lucide-react";
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

const RestrictUserDialog = ({ isOpen, onOpenChange, user, onConfirm }) => {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[540px] w-full p-10 border-0 rounded-[24px] overflow-hidden flex flex-col items-center gap-0 shadow-2xl bg-white"
                showCloseButton={false}
            >
                {/* Accessibility */}
                <VisuallyHidden.Root>
                    <DialogTitle>Restrict {user.name}</DialogTitle>
                    <DialogDescription>
                        Confirmation to restrict user {user.name} from using the app.
                    </DialogDescription>
                </VisuallyHidden.Root>

                {/* Close Button */}
                <div className="absolute top-6 right-6">
                    <DialogClose asChild>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors focus:outline-none">
                            <X className="w-6 h-6 text-[#8F95B2]" />
                        </button>
                    </DialogClose>
                </div>

                {/* Icon Container */}
                <div className="w-24 h-24 rounded-full bg-[#F9FAFB] flex items-center justify-center mb-6 mt-4">
                    <LogOut className="w-10 h-10 text-[#24282E]" />
                </div>

                {/* Content */}
                <h2 className={`${degular.className} text-[30px] text-[#24282E] mb-4 text-center tracking-tight`}>
                    Restrict {user.name}
                </h2>
                <p className="text-[18px] text-[#6C6C6C] text-center mb-10 max-w-[380px] leading-relaxed">
                    Are you sure you want to restrict {user.name} from using the app?
                </p>

                {/* Footer / Buttons */}
                <div className="flex items-center justify-center gap-4 w-full">
                    <Button
                        variant="outline"
                        className="flex-1 border-[#E07386] text-[#E07386] hover:bg-[#FFF5F6] rounded-[20px] h-[64px] font-bold text-[18px] transition-all"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-[#E07386] hover:bg-[#d06376] text-white rounded-[20px] h-[64px] font-bold text-[18px] shadow-lg shadow-[#E07386]/20 transition-all border-0"
                        onClick={() => {
                            if (onConfirm) onConfirm(user);
                            onOpenChange(false);
                        }}
                    >
                        Yes, Restrict
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RestrictUserDialog;
