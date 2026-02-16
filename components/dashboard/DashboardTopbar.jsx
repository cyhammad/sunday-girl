"use client";

import React from "react";
import { X } from "lucide-react";
import { NotificationsIcon } from "@/components/icons/icons";
import { MobileSidebar } from "@/components/dashboard/sidebar/DashboardSidebar";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../fonts/degular/DegularDemo-Semibold.otf",
});

const notifications = [
  {
    initials: "UV",
    title: "Flagged Post",
    description: "User Violeta has flagged a post. Please review the content.",
    time: "2min",
  },
  {
    initials: "JO",
    title: "New User",
    description:
      "Jamie Oliver joined the platform. Welcome them to the Community Feed!",
    time: "2min",
  },
  {
    initials: "AC",
    title: "New Video",
    description:
      'A new video, "Perfecting Your Plank," has been uploaded by Alex Cruz.',
    time: "2min",
  },
  {
    initials: "BB",
    title: "New Practice",
    description:
      'Brittany Banks has started a new practice: "Sunrise Yoga Flow."',
    time: "2min",
  },
  {
    initials: "EV",
    title: "Milestone",
    description:
      "Ethan Vance has completed 30 days of daily practice! Keep up the great work!",
    time: "2min",
    extraUser: "Hazel Skye",
  },
  {
    initials: "GC",
    title: "Challenge",
    description:
      'Gina Carano has invited you to join the "Core Strength Challenge." Join now!',
    time: "2min",
    extraUser: "Willow Mae",
  },
];

const DashboardTopbar = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isMounted) {
    return (
      <div className="w-full h-[64px] lg:h-[80px] flex shrink-0">
        <header className="w-full h-[64px] lg:h-[80px] bg-white border-b border-[#D5D5D5] flex items-center justify-between px-4 lg:px-6">
          <div className="lg:hidden">
            <div className="w-10 h-10" />
          </div>
          <div className="hidden lg:block"></div>
          <div className="flex items-center">
            <div className="w-10 h-10" />
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="w-full h-[64px] lg:h-[80px] flex shrink-0">
      <header className="w-full h-[64px] lg:h-[80px] bg-white border-b border-[#D5D5D5] flex items-center justify-between px-4 lg:px-6">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <MobileSidebar />
        </div>

        {/* Spacer for desktop */}
        <div className="hidden lg:block"></div>

        {/* Right Side Content */}
        <div className="relative" ref={dropdownRef}>
          {/* Bell Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-transparent border-0 cursor-pointer rounded-xl transition-all duration-300 hover:bg-gray-50 flex items-center justify-center p-2 relative"
          >
            <NotificationsIcon className="w-6 h-6 text-[#757575]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E07386] rounded-full" />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-[420px] bg-white rounded-[20px] shadow-[0px_10px_50px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h3
                  className={`${degular.className} text-[22px] text-[#24282E]`}
                >
                  Notifications
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-[#757575]" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-6 border-b border-[#E5E5E5]" />

              {/* Notifications List */}
              <div className="max-h-[500px] overflow-y-auto py-2">
                {notifications.map((notif, index) => (
                  <div
                    key={index}
                    className="px-6 py-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-[52px] h-[52px] rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0">
                        <span
                          className={`${inter.className} text-[16px] font-semibold text-[#757575]`}
                        >
                          {notif.initials}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`${inter.className} text-[15px] font-bold text-[#24282E] mb-1`}
                        >
                          {notif.title}
                        </h4>
                        <p
                          className={`${inter.className} text-[14px] text-[#757575] leading-relaxed`}
                        >
                          {notif.description}
                        </p>

                        {/* Extra user tag */}
                        {notif.extraUser && (
                          <div className="flex items-center gap-2 mt-3">
                            <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-[#D4A684] to-[#C49070] overflow-hidden" />
                            <span
                              className={`${inter.className} text-[14px] font-semibold text-[#24282E]`}
                            >
                              {notif.extraUser}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Time */}
                      <span
                        className={`${inter.className} text-[13px] text-[#8F8F8F] shrink-0 mt-1`}
                      >
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default DashboardTopbar;
