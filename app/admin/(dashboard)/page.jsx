"use client";

import React from "react";
import localFont from "next/font/local";
import KpiCards from "@/components/dashboard/KpiCards";
import DashboardCharts from "./_components/DashboardCharts";
import DateRangePicker from "./_components/DateRangePicker";

const degular = localFont({
  src: "../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const dashboardKpiData = [
  {
    title: "Soft Spark Video",
    value: "850",
    suffix: "Views",
  },
  {
    title: "Welcome to Sunday Girl",
    value: "900",
    suffix: "Views",
  },
  {
    title: "This Week's Practice",
    value: "120",
    suffix: "Users Joined",
  },
  {
    title: "Subscription Revenue",
    value: "$ 3,000",
    suffix: "",
  },
];

const DashboardPage = () => {
  return (
    <div className="p-6 lg:p-10 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className={`${degular.className} text-[32px] text-[#24282E]`}>
          Dashboard
        </h1>

        <DateRangePicker />
      </div>

      <KpiCards data={dashboardKpiData} />

      <DashboardCharts />
    </div>
  );
};

export default DashboardPage;
