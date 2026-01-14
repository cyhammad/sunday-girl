"use client";

import React from "react";
import Image from "next/image";
import ImSoInButton from "@/components/landing/buttons/ImSoInButton";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Section1 = () => {
  return (
    <div className="grid lg:grid-cols-2 sm:gap-8 gap-4 w-full self-center bg-white sm:bg-transparent p-5 sm:p-0 max-w-360 rounded-[16px] sm:rounded-2xl overflow-hidden">
      <div className="relative rounded-2xl overflow-hidden min-h-[458px] sm:min-h-auto">
        <Image
          src="/sec-1.png"
          alt="Lifestyle photograph"
          width={618}
          height={448}
          className="w-full h-full object-cover"
          priority
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="size-[70px] sm:size-24 rounded-full bg-white/16 border border-white/25 hover:bg-white transition-colors flex items-center justify-center shadow-lg"
            aria-label="Play video"
          >
            <svg
              width="48"
              height="50"
              viewBox="0 0 48 50"
              className="size-9 sm:size-12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2941 24.7059V13.3059C11.2941 8.95979 15.998 6.24272 19.7627 8.41427L29.6482 14.1164L39.5234 19.816C43.2896 21.9897 43.2889 27.4258 39.5221 29.5985L29.6458 35.2954L19.763 40.9967C15.9983 43.1685 11.2941 40.4515 11.2941 36.1052V24.7084V24.7059Z"
                fill="white"
                stroke="white"
                strokeWidth="2.82353"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1 md:text-base text-sm bg-white rounded-2xl flex flex-col w-full items-start gap-4 p-0 sm:p-8 lg:p-10 xl:p-10">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight text-primary">
          Creating something real... for us.
        </h1>
        <p className="">
          We're connected to everything and yet still out of touch with
          ourselves.
        </p>
        <p className="">
          Social media edits our personalities. Perfection is curated. Every
          scroll says: Do more. Be better. Glow up. Heal. Repeat.
        </p>
        <p className="">It's all so... loud.</p>
        <p className="">What if all you needed was space?</p>
        <p className="">
          To actually hear yourself. To break the loops. To practice who you're
          becoming, not just talk about her.
        </p>
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
    </div>
  );
};

export default Section1;
