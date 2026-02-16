"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Plus, ArrowRight } from "lucide-react";
import KpiCards from "@/components/dashboard/KpiCards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import VideoDetailsDialog from "./_components/VideoDetailsDialog";
import EditPracticeDialog from "./_components/EditPracticeDialog";
import UploadVideoDialog from "./_components/UploadVideoDialog";
import UploadPracticeVideoDialog from "./_components/UploadPracticeVideoDialog";
import EditPracticeVideoDialog from "./_components/EditPracticeVideoDialog";
import DeletePracticeVideoDialog from "./_components/DeletePracticeVideoDialog";
import DeletePostFromFeedDialog from "./_components/DeletePostFromFeedDialog";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const contentKpiData = [
  {
    title: "Total Practices",
    value: "12",
  },
  {
    title: "Users who joined this week practice",
    value: "50",
  },
];

const videosData = [
  {
    name: "Sky High",
    description: "A flight through the clouds.",
    peopleJoined: "45 people joined",
    dateCreated: "10/10/2024",
  },
  {
    name: "Ocean Deep",
    description: "An adventure under the sea.",
    peopleJoined: "60 people joined",
    dateCreated: "10/11/2024",
  },
  {
    name: "Jungle Book",
    description: "A story in the jungle.",
    peopleJoined: "75 people joined",
    dateCreated: "10/12/2024",
  },
  {
    name: "Desert Heat",
    description: "A journey in the desert.",
    peopleJoined: "90 people joined",
    dateCreated: "10/13/2024",
  },
  {
    name: "Mountain Top",
    description: "A hike up a mountain.",
    peopleJoined: "120 people joined",
    dateCreated: "10/14/2024",
  },
  {
    name: "Forest Green",
    description: "A walk in the forest.",
    peopleJoined: "150 people joined",
    dateCreated: "10/15/2024",
  },
];

const ContentManagementPage = () => {
  const [activeTab, setActiveTab] = useState("Weekly Practice Videos");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUploadPracticeOpen, setIsUploadPracticeOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabs = [
    "Weekly Practice Videos",
    "Soft Spark",
    "Welcome To SundayGirl",
  ];

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  // Column headers mapping
  const columns = {
    "Weekly Practice Videos": [
      "Video Name",
      "Video Description",
      "People Joined",
      "Date Created",
      "Action",
    ],
    "Soft Spark": ["Video Name", "Status", "People Watched", "Date", "Action"],
    "Welcome To SundayGirl": [
      "Video Name",
      "Status",
      "People Watched",
      "Date",
      "Action",
    ],
  };

  const getTableData = () => {
    if (activeTab === "Weekly Practice Videos") {
      return videosData;
    }
    // Example for Soft Spark/Welcome
    return [
      {
        name: "Sky High",
        status: "Active",
        peopleWatched: "45 people",
        date: "10/10/2024",
      },
    ];
  };

  const currentColumns = columns[activeTab];
  const currentData = getTableData();

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-[#FFFFFF]">
      <div className="flex items-center justify-between mb-10">
        <h1 className={`${degular.className} text-[32px] text-[#24282E]`}>
          Content Management
        </h1>

        <Button
          onClick={() => setIsUploadPracticeOpen(true)}
          className="bg-[#E07386] hover:bg-[#d06376] text-white rounded-[10px] h-12 px-6 shadow-sm flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5 stroke-[2.5px]" />
          Create New Practice
        </Button>
      </div>

      <KpiCards data={contentKpiData} />

      <div className="mt-14">
        <h2 className={`${degular.className} text-[24px] text-[#24282E] mb-8`}>
          Practice Videos
        </h2>

        {/* Tabs */}
        <div className="inline-flex p-1.5 bg-[#F9F9F9] rounded-[30px] mb-8 border border-[#F2F2F2]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-7 py-2.5 rounded-[25px] text-[15px] font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-[#E07386] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] border border-[#F2F2F2]"
                  : "text-[#8F8F8F] hover:text-[#6C6C6C]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[20px] border border-[#F2F2F2] overflow-hidden shadow-[0px_4px_30px_rgba(0,0,0,0.03)] flex flex-col min-h-[500px]">
          <Table>
            <TableHeader className="bg-[#F9F9F9]/50 border-b border-[#F2F2F2]">
              <TableRow className="hover:bg-transparent border-none">
                {currentColumns.map((col) => (
                  <TableHead
                    key={col}
                    className="px-8 py-5 text-[15px] font-semibold text-[#24282E] h-auto uppercase tracking-wide"
                  >
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow
                  key={index}
                  className="border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/30 transition-colors"
                >
                  <TableCell className="px-8 py-7 text-[16px] text-[#525252] font-medium">
                    {row.name}
                  </TableCell>
                  {activeTab === "Weekly Practice Videos" ? (
                    <>
                      <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                        {row.description}
                      </TableCell>
                      <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                        {row.peopleJoined}
                      </TableCell>
                      <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                        {row.dateCreated}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                        {row.status}
                      </TableCell>
                      <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                        {row.peopleWatched}
                      </TableCell>
                      <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                        {row.date}
                      </TableCell>
                    </>
                  )}
                  <TableCell className="px-8 py-7">
                    <button
                      onClick={() => {
                        setSelectedVideo(row);
                        setIsDetailsOpen(true);
                      }}
                      className="text-[#E07386] text-[15px] font-bold flex items-center gap-1.5 group transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add New Video CTA Section for Soft Spark/Welcome tabs */}
          {activeTab !== "Weekly Practice Videos" && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white">
              <h3
                className={`${degular.className} text-[28px] text-[#24282E] mb-3`}
              >
                {activeTab === "Welcome To SundayGirl"
                  ? "Add New Welcome Video"
                  : `Add New ${activeTab} Video`}
              </h3>
              <p className="text-[#8F8F8F] text-[16px] text-center mb-10 max-w-[450px] leading-relaxed">
                {activeTab === "Welcome To SundayGirl"
                  ? "Add new Welcome to SundayGirl video. Adding new video will replace the previous one."
                  : `Add new ${activeTab.toLowerCase()} video. Adding new video will replace the previous one.`}
              </p>
              <Button
                onClick={() => {
                  if (
                    activeTab === "Soft Spark" ||
                    activeTab === "Welcome To SundayGirl"
                  ) {
                    setIsUploadOpen(true);
                  } else {
                    setSelectedVideo(null);
                    setIsEditOpen(true);
                  }
                }}
                className="bg-[#E07386] hover:bg-[#d06376] text-white rounded-[12px] h-[52px] px-10 flex items-center gap-2 font-semibold shadow-sm"
              >
                <Plus className="w-5 h-5 stroke-[2.5px]" />
                Add New Video
              </Button>
            </div>
          )}
        </div>
      </div>

      <VideoDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        video={selectedVideo}
        onEdit={() => {
          setIsDetailsOpen(false);
          setIsEditOpen(true);
        }}
        onDelete={() => {
          setIsDetailsOpen(false);
          setIsDeleteOpen(true);
        }}
        onDeletePost={(post) => {
          setIsDetailsOpen(false);
          setSelectedPost(post);
          setIsDeletePostOpen(true);
        }}
      />

      {activeTab === "Weekly Practice Videos" ? (
        <EditPracticeVideoDialog
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          video={selectedVideo}
          onDelete={() => {
            setIsEditOpen(false);
            setIsDeleteOpen(true);
          }}
        />
      ) : (
        <EditPracticeDialog
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          video={selectedVideo}
          title={activeTab}
          onDelete={() => {
            setIsEditOpen(false);
            setIsDeleteOpen(true);
          }}
        />
      )}

      <UploadVideoDialog
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        type={activeTab}
      />

      <UploadPracticeVideoDialog
        isOpen={isUploadPracticeOpen}
        onOpenChange={setIsUploadPracticeOpen}
      />

      <DeletePracticeVideoDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        video={selectedVideo}
        onDelete={(video) => {
          console.log("Deleting video:", video);
          // Add deletion logic here
        }}
      />

      <DeletePostFromFeedDialog
        isOpen={isDeletePostOpen}
        onOpenChange={setIsDeletePostOpen}
        onConfirm={() => {
          console.log("Deleting post:", selectedPost);
          // Add deletion logic here
        }}
      />
    </div>
  );
};

export default ContentManagementPage;
