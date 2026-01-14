"use client";

import React from "react";
import Image from "next/image";
import ImSoInButton from "@/components/landing/buttons/ImSoInButton";
import { Button } from "@/components/ui/button";

const Section3 = () => {
  return (
    <div className="grid lg:grid-cols-2 sm:gap-8 gap-4 self-center max-w-360 bg-white sm:bg-transparent p-5 sm:p-0 rounded-[16px] sm:rounded-2xl overflow-hidden">
      <div className="flex-1 order-2 lg:order-1 md:text-base text-sm bg-white rounded-2xl flex flex-col w-full items-start gap-4 p-0 sm:p-8 lg:p-8 xl:p-10">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight text-primary">
        What This Space Would Give
        </h1>
        <p className="">It's not another "soft girl era" with a never-ending to do list.</p>
        <p>
          It's just space. <br /> To share the wins, the progress, the awkward
          stuff, and the off-days. To feel seen without needing to explain
          everything. To show up without the pressure of reinventing yourself
          every week.
        </p>
        <p className="">
          Because the girl you've been craving to be is not just a Pinterest
          board. She's a practice. She's in the little choices you make every
          day.
        </p>
        <p className="">That's exactly what this space is for.</p>
        <Button
          size="xl"
          className="mt-2 text-2xl sm:text-xl h-[58px] w-[163px] gap-1.5 sm:h-[63px]"
        >
          I'm so in
          <Image
            src="/arrow.png"
            quality={100}
            width={24}
            height={24}
            className="size-4.5"
            alt="Arrow"
          />
        </Button>
      </div>
      <div className="relative order-1 lg:order-2 rounded-2xl min-h-[390px] sm:min-h-auto overflow-hidden">
        <Image
          src="/sec-2.png"
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
