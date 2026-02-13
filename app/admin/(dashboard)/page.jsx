"use client";

import React from "react";
import localFont from "next/font/local";
import KpiCards from "./_components/KpiCards";
import DashboardCharts from "./_components/DashboardCharts";
import DateRangePicker from "./_components/DateRangePicker";

const degular = localFont({
  src: "../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const DashboardPage = () => {
  return (
    <div className="p-6 lg:p-10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`${degular.className} text-[28px] text-[#24282E]`}>
          Dashboard
        </h1>

        <DateRangePicker />
      </div>

      <KpiCards />

      <DashboardCharts />
    </div>
  );
};

export default DashboardPage;
