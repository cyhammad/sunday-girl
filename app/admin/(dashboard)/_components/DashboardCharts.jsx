"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

// New Registrations data
const registrationData = [
  { day: "01", value: 320 },
  { day: "02", value: 280 },
  { day: "03", value: 350 },
  { day: "04", value: 420 },
  { day: "05", value: 380 },
  { day: "06", value: 300 },
  { day: "07", value: 250 },
  { day: "08", value: 480 },
  { day: "09", value: 415 },
  { day: "10", value: 350 },
  { day: "11", value: 280 },
  { day: "12", value: 220 },
  { day: "13", value: 180 },
  { day: "14", value: 250 },
  { day: "15", value: 300 },
  { day: "16", value: 380 },
  { day: "17", value: 420 },
  { day: "18", value: 500 },
  { day: "19", value: 450 },
  { day: "20", value: 380 },
  { day: "21", value: 320 },
  { day: "22", value: 280 },
  { day: "23", value: 350 },
  { day: "24", value: 420 },
  { day: "25", value: 380 },
  { day: "26", value: 320 },
  { day: "27", value: 280 },
  { day: "28", value: 350 },
  { day: "29", value: 200 },
  { day: "30", value: 150 },
];

// Video Views data
const videoViewsData = [
  { day: "01", value: 80 },
  { day: "02", value: 120 },
  { day: "03", value: 100 },
  { day: "04", value: 150 },
  { day: "05", value: 130 },
  { day: "06", value: 90 },
  { day: "07", value: 70 },
  { day: "08", value: 200 },
  { day: "09", value: 250 },
  { day: "10", value: 180 },
  { day: "11", value: 120 },
  { day: "12", value: 100 },
  { day: "13", value: 150 },
  { day: "14", value: 200 },
  { day: "15", value: 180 },
  { day: "16", value: 98 },
  { day: "17", value: 300 },
  { day: "18", value: 500 },
  { day: "19", value: 400 },
  { day: "20", value: 350 },
  { day: "21", value: 280 },
  { day: "22", value: 220 },
  { day: "23", value: 200 },
  { day: "24", value: 250 },
  { day: "25", value: 300 },
  { day: "26", value: 350 },
  { day: "27", value: 280 },
  { day: "28", value: 200 },
  { day: "29", value: 150 },
  { day: "30", value: 50 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "#E07386",
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#E07386] text-white px-3 py-2 rounded-lg shadow-lg text-center min-w-[80px]">
        <p className="text-[11px] font-medium opacity-90">Jan {label}, 2026</p>
        <p className={`${degular.className} text-[20px] font-bold`}>
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const ranges = [
  "Today",
  "Last 7 days",
  "Last 14 days",
  "This Month",
  "Last 3 Months",
  "Last 6 Months",
  "Last Year",
  "Custom",
];

const StatisticsChart = ({ title, data }) => {
  const [selectedRange, setSelectedRange] = React.useState("This Month");

  return (
    <div className="mt-8">
      <h2 className={`${degular.className} text-[22px] text-[#24282E] mb-4`}>
        {title}
      </h2>

      <div className="bg-white rounded-[20px] border border-[#F2F2F2] p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <p
            className={`${inter.className} text-[15px] font-medium text-[#24282E]`}
          >
            Statistics
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`${inter.className} flex items-center gap-1.5 px-4 py-2 rounded-[10px] border border-[#E5E5E5] text-[13px] text-[#6C6C6C] font-medium bg-white hover:bg-gray-50 transition-colors`}
              >
                {selectedRange}
                <ChevronDown className="w-3.5 h-3.5 text-[#6C6C6C]" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[200px] p-2 bg-white rounded-[20px] border border-[#F2F2F2] shadow-[0px_10px_40px_rgba(0,0,0,0.08)]"
              align="end"
              sideOffset={8}
            >
              <div className="flex flex-col gap-0.5">
                {ranges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`${degular.className} text-left px-4 py-2 text-[16px] text-[#525252] hover:text-[#E07386] hover:bg-[#F9F9F9] rounded-[14px] transition-all duration-200`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`gradient-${title.replace(/\s+/g, "")}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#E07386" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#E07386" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#F2F2F2"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#ADADAD" }}
              tickMargin={12}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#ADADAD" }}
              tickMargin={8}
              ticks={[0, 50, 100, 500, 1000]}
            />
            <ChartTooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#E07386",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="natural"
              dataKey="value"
              stroke="#E07386"
              strokeWidth={2.5}
              fill={`url(#gradient-${title.replace(/\s+/g, "")})`}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#E07386",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

const DashboardCharts = () => {
  return (
    <div>
      <StatisticsChart title="New Registrations" data={registrationData} />
      <StatisticsChart title="Video Views" data={videoViewsData} />
    </div>
  );
};

export default DashboardCharts;
