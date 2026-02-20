"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import {
  MoreVertical,
  Calendar,
  Heart,
  MessageCircle,
  Play,
  Flag,
} from "lucide-react";
import KpiCards from "@/components/dashboard/KpiCards";
import UploadPostDialog from "./_components/UploadPostDialog";
import PostSuccessDialog from "./_components/PostSuccessDialog";
import ViewPostDetailsDialog from "./_components/ViewPostDetailsDialog";
import RemovePostDialog from "./_components/RemovePostDialog";

const inter = Inter({ subsets: ["latin"] });
/* ... keep degular font definition ... */
const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const flaggedKpis = [
  {
    title: "Total Flagged Posts",
    value: "50",
  },
  {
    title: "This Week",
    value: "12",
  },
];

const feedData = [
  {
    id: 1,
    user: {
      name: "Hazel_Grace",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      time: "20min",
    },
    content:
      "Visited the Anne Frank House today. A very moving experience. #AnneFrankHouse #History",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    date: "May 15, 2024",
    likes: 2,
    comments: 15,
    isVideo: true,
  },
  {
    id: 2,
    user: {
      name: "Willow_Sage",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      time: "45min",
    },
    content:
      "Just had the best pizza in Naples! The crust was perfect. #Naples #Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    date: "March 10, 2024",
    likes: 8,
    comments: 7,
    isVideo: false,
  },
  {
    id: 3,
    user: {
      name: "Hazel_Grace",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      time: "20min",
    },
    content:
      "Visited the Anne Frank House today. A very moving experience. #AnneFrankHouse #History",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    date: "May 15, 2024",
    likes: 2,
    comments: 15,
    isVideo: true,
  },
  {
    id: 4,
    user: {
      name: "Aurora_Skye",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      time: "1hr",
    },
    content:
      "Exploring the ancient ruins of Rome. So much history here! #Rome #AncientHistory",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    date: "May 15, 2024",
    likes: 2,
    comments: 15,
    isVideo: true,
  },
  {
    id: 5,
    user: {
      name: "Scarlett_Faye",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      time: "5min",
    },
    content:
      "Witnessed a beautiful sunset at the Eiffel Tower. Paris is always a good idea. #EiffelTower #Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    date: "May 15, 2024",
    likes: 2,
    comments: 15,
    isVideo: false,
  },
  {
    id: 6,
    user: {
      name: "Stella_Rose",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
      time: "2hr",
    },
    content:
      "Spent the day at the Louvre Museum. So many masterpieces! #Louvre #Art",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80",
    date: "May 15, 2024",
    likes: 2,
    comments: 15,
    isVideo: true,
  },
];

const FeedCard = ({ post, showFlag, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[24px] border border-[#EEEEEE] p-5 shadow-[0px_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 transition-all duration-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 group cursor-pointer"
    >
      {/* Header - User Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#EEEEEE]">
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
            <span className="text-[#8F8F8F] text-[13px]">{post.user.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showFlag && (
            <Flag className="w-5 h-5 text-[#FF5B5B] fill-[#FF5B5B]" />
          )}
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-[#757575] hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Text */}
      <p className="text-[#525252] text-[15px] leading-relaxed">
        {post.content}
      </p>

      {/* Media Container */}
      <div className="relative aspect-[16/11] rounded-[20px] overflow-hidden bg-gray-100 cursor-pointer">
        <img
          src={post.image}
          alt="Post media"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {post.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Footer - Stats */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-[#8F8F8F]">
          <Calendar className="w-4 h-4" />
          <span className="text-[13px]">{post.date}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#8F8F8F] hover:text-[#E07386] cursor-pointer transition-colors group/stat">
            <Heart className="w-4 h-4 transition-transform group-hover/stat:scale-110" />
            <span className="text-[13px] font-medium">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8F8F8F] hover:text-[#E07386] cursor-pointer transition-colors group/stat">
            <MessageCircle className="w-4 h-4 transition-transform group-hover/stat:scale-110" />
            <span className="text-[13px] font-medium">{post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunityFeedPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isMounted, setIsMounted] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleUpload = (data) => {
    console.log("Uploading post:", data);
    setIsUploadOpen(false);
    setTimeout(() => {
      setIsSuccessOpen(true);
    }, 300);
  };

  const handleAddNewPost = () => {
    setIsSuccessOpen(false);
    setTimeout(() => {
      setIsUploadOpen(true);
    }, 300);
  };

  return (
    <div className={`p-6 lg:p-10 min-h-screen bg-[#FFFFFF] ${inter.className}`}>
      <div className="w-full">
        {/* Title & Upload Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h1 className={`${degular.className} text-[32px] text-[#24282E]`}>
            Community Feed
          </h1>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="bg-[#E07386] hover:bg-[#d06376] text-white font-medium h-[44px] px-6 rounded-[10px] shadow-sm text-[15px] transition-all"
          >
            Upload Video
          </button>
        </div>

        {/* Tabs */}
        <div className="inline-flex p-1.5 bg-[#F9F9F9] rounded-[30px] mb-8 border border-[#F2F2F2]">
          {["All", "Flagged"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-[25px] text-[14px] font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "text-[#E07386] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] border border-[#F2F2F2]"
                  : "text-[#8F8F8F] hover:text-[#6C6C6C]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Flagged Section KPI Cards */}
        {activeTab === "Flagged" && (
          <div className="mb-12">
            <KpiCards data={flaggedKpis} />
          </div>
        )}

        {/* Posts Heading */}
        {activeTab === "Flagged" && (
          <h2
            className={`${degular.className} text-[28px] text-[#24282E] mb-8`}
          >
            Posts
          </h2>
        )}

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {feedData.map((post) => (
            <FeedCard
              key={post.id}
              post={post}
              showFlag={activeTab === "Flagged"}
              onClick={() => {
                setSelectedPost(post);
                setIsDetailsOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Upload Dialog */}
      <UploadPostDialog
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUpload={handleUpload}
      />

      {/* Success Dialog */}
      <PostSuccessDialog
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onAddNewPost={handleAddNewPost}
      />

      {/* Details Dialog */}
      <ViewPostDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        post={selectedPost}
        onRemove={() => setIsRemoveOpen(true)}
      />

      {/* Remove Confirmation Dialog */}
      <RemovePostDialog
        isOpen={isRemoveOpen}
        onOpenChange={setIsRemoveOpen}
        onConfirm={() => {
          console.log("Removing post:", selectedPost?.id);
          setIsDetailsOpen(false);
        }}
      />
    </div>
  );
};

export default CommunityFeedPage;
