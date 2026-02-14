"use client";

import React from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
    src: "../fonts/degular/DegularDemo-Semibold.otf",
});

const KpiCards = ({ data }) => {
    return (
        <div className="flex flex-wrap gap-[40px] mt-6">
            {data?.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="bg-white p-[20px] rounded-[10px] border border-[#F2F2F2] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col justify-between w-[245px] h-[118px]"
                    >
                        <p className="text-[#6C6C6C] text-[15px] font-medium">
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
