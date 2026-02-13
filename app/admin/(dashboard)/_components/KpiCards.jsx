"use client";

import React from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const kpiData = [
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

const KpiCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {kpiData.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-white p-8 rounded-[20px] border border-[#F2F2F2] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col justify-center min-h-[140px]"
          >
            <p className="text-[#6C6C6C] text-[15px] font-medium mb-4">
              {item.title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className={`${degular.className} text-[32px] text-[#24282E]`}>
                {item.value}
              </h3>
              {item.suffix && (
                <span className="text-[#8F8F8F] text-[13px] font-normal">
                  {item.suffix}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KpiCards;
