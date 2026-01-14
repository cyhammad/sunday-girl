import Section2 from "@/components/landing/sections/Section2";
import Section3 from "@/components/landing/sections/Section3";
import Section1 from "@/components/landing/sections/Section1";
import React from "react";
import MainSection from "@/components/landing/sections/MainSection";

const LandingPage = () => {
  return (
    <div className="flex flex-col w-full h-full gap-6 sm:gap-20">
      <MainSection />
      <div className="flex flex-col px-5 lg:px-10 gap-9 md:gap-20 max-w-[1352px] self-center">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
};

export default LandingPage;
