"use client";

import React from "react";
import { NotificationsIcon } from "@/components/icons/icons";
import { MobileSidebar } from "@/components/dashboard/sidebar/DashboardSidebar";

const DashboardTopbar = () => {
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
        <div className="flex items-center">
          {/* Notification Bell */}
          <button className="bg-transparent border-0 cursor-pointer rounded-xl transition-all duration-300 hover:bg-gray-50 flex items-center justify-center p-2">
            <NotificationsIcon className="w-6 h-6 text-[#757575]" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default DashboardTopbar;
