"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowIcon } from "@/icons/landing-icons";

const Section2 = () => {
  return (
    <div className="grid lg:grid-cols-2 sm:gap-8 gap-4 self-center max-w-360 bg-white sm:bg-transparent p-5 sm:p-0 rounded-[16px] sm:rounded-2xl overflow-hidden">
      <div className="flex-1 order-2 lg:order-1 text-xl text-[#2A2A2A] bg-white rounded-2xl flex flex-col w-full items-start gap-4 p-0 sm:p-8 lg:p-8 xl:p-10">
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
        <Link href="#section3">
        <Button
          className="mt-2 text-xl h-[58px] md:h-[58px] w-[165px] gap-1.5"
        >
          I'm so in
          <ArrowIcon className="size-5" />
        </Button>
        </Link>
      </div>
      <div className="relative order-1 lg:order-2 rounded-2xl min-h-[390px] sm:min-h-auto overflow-hidden">
        <Image
          src="/sect-2.png"
          alt="Lifestyle photograph"
          width={618}
          height={581}
          className="w-full h-full object-cover"
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default Section2;
