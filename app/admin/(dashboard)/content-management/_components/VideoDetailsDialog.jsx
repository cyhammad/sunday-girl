"use client";

import React from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { X, Play, Edit3, Trash2, Heart, MessageSquare } from "lucide-react";
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

const VideoDetailsDialog = ({ isOpen, onOpenChange, video, onEdit, onDelete, onDeletePost }) => {
    if (!video) return null;

    const practiceFeed = [
        {
            id: 1,
            author: "Marta Sen",
            time: "5 min ago",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            content: "Embrace the stillness and breathe in the beauty of nature. #NatureTherapy #Mindfulness",
            likes: 12,
            comments: 2,
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        },
        {
            id: 2,
            author: "Javier Ramirez",
            time: "10 min ago",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            content: "Finding peace in the simple things. A walk in the park does wonders for the soul. #NatureLover #InnerPeace",
            likes: 8,
            comments: 0,
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
            isVideo: true,
        },
        {
            id: 3,
            author: "Aisha Khan",
            time: "15 min ago",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            content: "Letting nature be your guide and your peace. #FindYourPark #MindfulMoments",
            likes: 15,
            comments: 1,
            image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=300&fit=crop",
            isVideo: true,
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[737px] w-full h-[95vh] p-0 border-0 rounded-[20px] overflow-hidden flex flex-col gap-0 shadow-2xl fixed left-auto right-6 top-1/2 -translate-y-1/2 translate-x-0"
                showCloseButton={false}
            >
                {/* Accessibility */}
                <VisuallyHidden.Root>
                    <DialogTitle>View Details</DialogTitle>
                    <DialogDescription>
                        Details and practice feed for {video.name}
                    </DialogDescription>
                </VisuallyHidden.Root>

                {/* Header */}
                <div className="px-8 py-5 border-b border-[#F2F2F2] flex items-center justify-between bg-white shrink-0">
                    <h2 className={`${degular.className} text-[22px] text-[#24282E]`}>View Details</h2>
                    <DialogClose asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-[#24282E]" />
                        </button>
                    </DialogClose>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
                    {/* Main Practice Card */}
                    <div className="bg-white rounded-[24px] border border-[#F2F2F2] p-8 shadow-[0px_4px_30px_rgba(0,0,0,0.01)] mb-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className={`${degular.className} text-[20px] text-[#24282E] mb-1`}>This Week's Practice</h3>
                                <p className="text-[15px] font-medium text-[#E07386]">{video.name}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={onEdit}
                                    className="w-10 h-10 rounded-full bg-white border border-[#F2F2F2] flex items-center justify-center text-[#525252] hover:bg-gray-50 transition-colors"
                                >
                                    <Edit3 className="w-[18px] h-[18px]" />
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="w-10 h-10 rounded-full bg-[#FFF1F3] flex items-center justify-center text-[#FF4D4D] hover:bg-[#FFE4E8] transition-colors"
                                >
                                    <Trash2 className="w-[18px] h-[18px]" />
                                </button>
                            </div>
                        </div>

                        <p className="text-[#6C6C6C] text-[15px] leading-relaxed mb-8">
                            This week's video focuses on a healthy practice to improve your overall well-being. This week, we'll guide you through a gentle yet effective routine that's perfect for women at any stage of their wellness journey.
                        </p>

                        <div className="grid grid-cols-3 gap-8 mb-8 border-t border-[#F2F2F2] pt-6">
                            <div>
                                <label className="text-[13px] text-[#8F8F8F] block mb-1">People Joined</label>
                                <p className="text-[15px] font-semibold text-[#24282E]">45 people joined</p>
                            </div>
                            <div>
                                <label className="text-[13px] text-[#8F8F8F] block mb-1">Likes</label>
                                <p className="text-[15px] font-semibold text-[#24282E]">20</p>
                            </div>
                            <div>
                                <label className="text-[13px] text-[#8F8F8F] block mb-1">Uploaded on</label>
                                <p className="text-[15px] font-semibold text-[#24282E]">Dec 12, 2025</p>
                            </div>
                        </div>

                        <div className="relative aspect-video rounded-[16px] overflow-hidden group">
                            <Image
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fit=crop&w=800&q=80"
                                alt="Video Thumbnail"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-[#24282E] fill-current" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Practice Feed Section */}
                    <div className="bg-white rounded-[24px] border border-[#F2F2F2] p-8 shadow-[0px_4px_30px_rgba(0,0,0,0.01)]">
                        <h3 className={`${degular.className} text-[22px] text-[#24282E] mb-8`}>Practice Feed</h3>
                        <div className="flex flex-col gap-8">
                            {practiceFeed.map((post) => (
                                <div key={post.id} className="flex gap-5 group border-b border-[#F2F2F2] pb-8 last:border-0 last:pb-0">
                                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                                        <Image src={post.avatar} alt={post.author} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <h4 className="text-[15px] font-bold text-[#24282E] leading-tight">{post.author}</h4>
                                                    <p className="text-[12px] text-[#8F8F8F]">{post.time}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[#6C6C6C] text-[15px] leading-relaxed mb-4 pr-10">
                                            {post.content}
                                        </p>

                                        <div className="flex items-center gap-6 mb-4">
                                            <button className="flex items-center gap-1.5 text-[14px] text-[#24282E] font-medium">
                                                <Heart className="w-[18px] h-[18px]" />
                                                {post.likes}
                                            </button>
                                            <button className="flex items-center gap-1.5 text-[14px] text-[#24282E] font-medium">
                                                <MessageSquare className="w-[18px] h-[18px]" />
                                                {post.comments}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="relative w-[180px] h-[120px] rounded-[12px] overflow-hidden shrink-0 shadow-sm">
                                        <Image src={post.image} alt="Feed content" fill className="object-cover" />
                                        {post.isVideo && (
                                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                                <Play className="w-5 h-5 text-white fill-current opacity-80" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center pl-2">
                                        <button
                                            onClick={() => {
                                                if (onDeletePost) onDeletePost(post);
                                            }}
                                            className="w-9 h-9 rounded-full bg-[#FFF1F3] flex items-center justify-center text-[#FF4D4D] hover:bg-[#FFE4E8] transition-colors shadow-sm"
                                        >
                                            <Trash2 className="w-[16px] h-[16px]" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-[#F2F2F2] bg-white flex justify-end shrink-0">
                    <Button
                        className="bg-[#E07386] hover:bg-[#d06376] text-white rounded-[12px] h-11 px-10 font-bold shadow-sm"
                        onClick={() => onOpenChange(false)}
                    >
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VideoDetailsDialog;
