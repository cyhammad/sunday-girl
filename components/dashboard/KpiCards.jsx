"use client";

import React from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
  src: "../fonts/degular/DegularDemo-Semibold.otf",
});

const KpiCards = ({ data, cardClassName, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-nowrap gap-4 lg:gap-[12px] mt-6",
        className,
      )}
    >
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              "bg-white p-[20px] rounded-[10px] border border-[#EEEEEE] shadow-[0px_2px_6px_0px_#90929433] flex flex-col justify-between w-full lg:flex-1 lg:min-w-[245px] h-[118px]",
              cardClassName,
            )}
          >
            <p
              className={`${inter.className} text-[#7A7C7F] text-[16px] font-medium leading-[1]`}
            >
              {item.title}
            </p>
            <div className="flex gap-2">
              <h3
                className={`${degular.className} text-[32px] font-extrabold text-[#4D5154] leading-[1]`}
              >
                {item.value}
              </h3>
              {item.suffix && (
                <span
                  className={`${inter.className} text-[#7A7C7F] mt-[12px] text-[12px] font-normal leading-[1]`}
                >
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
