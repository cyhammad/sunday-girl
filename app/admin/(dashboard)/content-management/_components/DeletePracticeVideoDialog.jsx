"use client";

import React from "react";
import localFont from "next/font/local";
import { X, Trash2 } from "lucide-react";
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

const DeletePracticeVideoDialog = ({ isOpen, onOpenChange, video, onDelete }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[450px] w-full p-0 border-0 rounded-[24px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white"
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
                <div className="p-4 flex justify-end shrink-0">
                    <DialogClose asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
                            <X className="w-5 h-5 text-[#24282E]" />
                        </button>
                    </DialogClose>
                </div>

                {/* Content Area */}
                <div className="px-10 pb-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-[#FFF1F3] flex items-center justify-center mb-6">
                        <Trash2 className="w-10 h-10 text-[#FF4D4D]" />
                    </div>

                    <h2 className={`${degular.className} text-[26px] text-[#24282E] mb-3`}>
                        Delete Practice Video
                    </h2>

                    <p className="text-[#8F8F8F] text-[16px] leading-relaxed mb-10">
                        Are you sure you want to delete <span className="text-[#24282E] font-semibold">{video?.name || "this"}</span> practice video?
                    </p>

                    <div className="flex items-center gap-4 w-full">
                        <Button
                            variant="outline"
                            className="flex-1 bg-white hover:bg-[#FFF1F3] text-[#E07386] border-[#E07386] rounded-[16px] h-14 font-bold text-[16px] transition-all"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 bg-[#E07386] hover:bg-[#d06376] text-white border-0 rounded-[16px] h-14 font-bold text-[16px] shadow-sm transition-all"
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
