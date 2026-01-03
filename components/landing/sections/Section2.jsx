"use client";

import React from "react";
import Image from "next/image";
import ImSoInButton from "@/components/landing/buttons/ImSoInButton";

const Section3 = () => {
  return (
    <div className="grid lg:grid-cols-[4.2fr_3fr] gap-8 self-center max-w-360">
      <div className="flex-1 md:text-2xl text-lg bg-white rounded-2xl flex flex-col w-full items-start gap-8 p-8 lg:p-12 xl:p-16">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight text-primary">
        What This Space Would Give
        </h1>
        <p>It's not another "soft girl era" with a never-ending to do list.</p>
        <p>
          It's just space. <br /> To share the wins, the progress, the awkward
          stuff, and the off-days. To feel seen without needing to explain
          everything. To show up without the pressure of reinventing yourself
          every week.
        </p>
        <p>
          Because the girl you've been craving to be is not just a Pinterest
          board. She's a practice. She's in the little choices you make every
          day.
        </p>
        <p>That's exactly what this space is for.</p>
        <ImSoInButton size="xl" />
      </div>
      <div className="relative rounded-2xl overflow-hidden">
        <Image
          src="/2.png"
          alt="Lifestyle photograph"
          width={708}
          height={759}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Section3;
