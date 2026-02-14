"use client";

import React from "react";
import localFont from "next/font/local";
import { X, CloudUpload } from "lucide-react";
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

const UploadPracticeVideoDialog = ({ isOpen, onOpenChange }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[700px] w-full max-h-[90vh] p-0 border-0 rounded-[24px] overflow-hidden flex flex-col gap-0 shadow-2xl bg-white"
                showCloseButton={false}
            >
                {/* Accessibility */}
                <VisuallyHidden.Root>
                    <DialogTitle>Upload Practice Video</DialogTitle>
                    <DialogDescription>
                        Form to upload a new practice video including title, description and video file.
                    </DialogDescription>
                </VisuallyHidden.Root>

                {/* Header */}
                <div className="px-10 py-8 flex items-center justify-between bg-white shrink-0">
                    <h2 className={`${degular.className} text-[28px] text-[#24282E]`}>Upload Practice Video</h2>
                    <DialogClose asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
                            <X className="w-6 h-6 text-[#24282E]" />
                        </button>
                    </DialogClose>
                </div>

                {/* Content Area */}
                <div className="px-10 pb-2 bg-white flex-1 overflow-y-auto">
                    <div className="mb-6">
                        <label className="block text-[18px] font-medium text-[#6C6C6C] mb-3">Title</label>
                        <input
                            type="text"
                            placeholder="Enter"
                            className="w-full h-16 px-6 rounded-[16px] border border-[#E5E7EB] focus:border-[#E07386] focus:ring-1 focus:ring-[#E07386] outline-none transition-all placeholder:text-[#9CA3AF] text-[16px]"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-[18px] font-medium text-[#6C6C6C] mb-3">Description</label>
                        <textarea
                            placeholder="Enter"
                            rows={4}
                            className="w-full px-6 py-4 rounded-[16px] border border-[#E5E7EB] focus:border-[#E07386] focus:ring-1 focus:ring-[#E07386] outline-none transition-all placeholder:text-[#9CA3AF] text-[16px] resize-none"
                        />
                    </div>

                    {/* Upload Box */}
                    <div className="border-2 border-dashed border-[#E5E7EB] rounded-[24px] py-14 px-10 flex flex-col items-center justify-center text-center bg-white group cursor-pointer hover:border-[#E07386] transition-colors">
                        <div className="w-16 h-16 rounded-full bg-[#F9FAFB] flex items-center justify-center mb-4 group-hover:bg-[#FFF1F3] transition-colors">
                            <CloudUpload className="w-8 h-8 text-[#24282E] group-hover:text-[#E07386] transition-colors" />
                        </div>
                        <h3 className="text-[20px] font-bold text-[#24282E] mb-2">Upload Video</h3>
                        <p className="text-[#8F8F8F] text-[16px] max-w-[450px] leading-relaxed">
                            Upload the 'This Week's Practice' video to introduce new users to our platform.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-10 bg-white flex items-center justify-end gap-4 shrink-0">
                    <Button
                        variant="outline"
                        className="bg-white hover:bg-[#FFF1F3] text-[#E07386] border-[#E07386] rounded-[16px] h-16 px-10 font-bold text-[18px] transition-all min-w-[140px]"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#E07386] hover:bg-[#d06376] text-white border-0 rounded-[16px] h-16 px-10 font-bold text-[18px] shadow-lg shadow-[#E07386]/20 transition-all min-w-[180px]"
                        onClick={() => onOpenChange(false)}
                    >
                        Upload Video
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UploadPracticeVideoDialog;
