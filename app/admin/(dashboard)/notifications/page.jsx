"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import {
  Calendar as LucideCalendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import NotificationSuccessDialog from "./_components/NotificationSuccessDialog";
import DeleteNotificationDialog from "./_components/DeleteNotificationDialog";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const scheduledNotifications = [
  {
    id: 1,
    title: "Practice Video Reminder",
    description:
      "Don't forget to record your practice video today! #VideoPractice #DailySkills",
    date: "10/04/2024",
  },
  {
    id: 2,
    title: "Soft Spark Update",
    description:
      "Check out the latest features in Soft Spark! #NewFeatures #SoftwareUpdates",
    date: "10/04/2024",
  },
];

const NotificationsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [date, setDate] = useState(new Date(2025, 6, 5));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [notifToDelete, setNotifToDelete] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSend = () => {
    // Logic for sending notification
    setIsSuccessOpen(true);
  };

  const handleAddNew = () => {
    setIsSuccessOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleDelete = () => {
    console.log("Deleting notification:", notifToDelete?.id);
    setIsDeleteOpen(false);
    setNotifToDelete(null);
  };

  return (
    <div className={`p-4 lg:p-10 min-h-screen bg-[#FFFFFF] ${inter.className}`}>
      <h1
        className={`${degular.className} text-[32px] lg:text-[40px] text-[#24282E] mb-8`}
      >
        Notifications
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">
        {/* Left Column - Create Notification */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[16px] font-medium text-[#8F8F8F]">
              Notification Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter"
              className="w-full h-[56px] px-4 rounded-[16px] border border-[#EEEEEE] bg-[#FAFAFA] focus:outline-none focus:border-[#E07386] transition-colors text-[#24282E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[16px] font-medium text-[#8F8F8F]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter"
              className="w-full h-[240px] p-4 rounded-[24px] border border-[#EEEEEE] bg-[#FAFAFA] focus:outline-none focus:border-[#E07386] transition-colors text-[#24282E] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[16px] font-medium text-[#8F8F8F]">
              Schedule Date
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                className="w-full h-[56px] px-4 rounded-[16px] border border-[#EEEEEE] bg-[#FAFAFA] focus:outline-none focus:border-[#E07386] transition-colors text-[#24282E]"
              />
              <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4CAF50]" />
            </div>
          </div>

          <button
            onClick={handleSend}
            className="bg-[#E07386] hover:bg-[#d06376] text-white font-semibold h-[44px] px-8 rounded-[12px] shadow-sm text-[15px] transition-all w-fit mt-4"
          >
            Send To All
          </button>
        </div>

        {/* Right Column - Scheduled Info */}
        <div className="space-y-8">
          {/* Calendar Section */}
          <div className="bg-white rounded-[24px] border border-[#EEEEEE] p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            <h2 className="text-[18px] font-bold text-[#24282E] mb-6">
              Scheduled Dates
            </h2>
            <div className="flex justify-center bg-[#FFF5F7] rounded-[24px] p-4 relative">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full border-none p-0 flex flex-col items-center justify-center pointer-events-none"
                classNames={{
                  months: "flex flex-col space-y-4 w-full",
                  month: "space-y-4 w-full",
                  caption:
                    "flex justify-center py-2 relative items-center w-full mb-4",
                  caption_label: "text-[18px] font-bold text-[#24282E]",
                  nav: "space-x-1 flex items-center absolute inset-x-0 top-0 justify-between w-full px-2 mt-2",
                  nav_button:
                    "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex w-full justify-between mb-2",
                  head_cell: "text-[#24282E] font-bold w-9 text-[14px]",
                  row: "flex w-full justify-between mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-9 h-9",
                  day: "h-9 w-9 p-0 font-medium aria-selected:opacity-100 text-[#24282E] hover:bg-[#FFD6DD] rounded-full transition-colors flex items-center justify-center",
                  day_selected:
                    "bg-[#E07386] text-white hover:bg-[#E07386] hover:text-white focus:bg-[#E07386] focus:text-white",
                  day_today:
                    "relative text-[#E07386] after:content-['Today'] after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:text-[10px] after:text-[#24282E] after:font-bold",
                  day_outside: "text-[#8F8F8F] opacity-50",
                  day_disabled: "text-[#8F8F8F] opacity-50",
                  day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
              <div className="absolute top-[184px] left-[134px]">
                <div className="w-1 h-1 bg-[#E07386] rounded-full"></div>
              </div>
              <div className="absolute top-[228px] left-[178px]">
                <div className="w-1 h-1 bg-[#E07386] rounded-full"></div>
              </div>
              <div className="absolute top-[228px] left-[266px]">
                <div className="w-1 h-1 bg-[#E07386] rounded-full"></div>
              </div>
              <div className="absolute top-[272px] left-[310px]">
                <div className="w-1 h-1 bg-[#E07386] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="bg-white rounded-[24px] border border-[#EEEEEE] p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-[18px] font-bold text-[#24282E] mb-6">
              Scheduled Notifications
            </h2>
            <div className="space-y-8">
              {scheduledNotifications.map((notif) => (
                <div key={notif.id} className="space-y-2 group relative">
                  <button
                    onClick={() => {
                      setNotifToDelete(notif);
                      setIsDeleteOpen(true);
                    }}
                    className="absolute right-0 top-0 p-2 text-[#8F8F8F] hover:text-[#E07386] transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <h3 className="text-[#E07386] font-bold text-[16px] leading-tight pr-8">
                    {notif.title}
                  </h3>
                  <p className="text-[#8F8F8F] text-[14px] leading-relaxed">
                    {notif.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#E07386] pt-1">
                    <LucideCalendar className="w-4 h-4" />
                    <span className="text-[14px] font-medium">
                      {notif.date}
                    </span>
                  </div>
                  {notif.id !== scheduledNotifications.length && (
                    <div className="h-[1px] bg-[#F2F2F2] mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NotificationSuccessDialog
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onAddNew={handleAddNew}
        notification={{ title, description }}
      />

      <DeleteNotificationDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default NotificationsPage;
