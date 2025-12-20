import React from "react";
import ImSoInButton from "@/components/landing/buttons/ImSoInButton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MainSection = () => {
  return (
    <div
      className="flex w-full gap-5 flex-col text-center text-white items-center justify-center min-h-[632px] h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/main-bg.png')" }}
    >
      <h1 className="text-3xl sm:text-5xl font-bold">This one's for us.</h1>
      <p className="text-2xl sm:text-[40px] text-[#ECECEC]">
        The space we've craved but never quite found.
      </p>
      <Button size="xl" className="mt-2 text-xl sm:text-3xl sm:h-[74px]">
        I'm so in
        <ArrowRight strokeWidth={3} className="size-5 sm:size-7" />
      </Button>
    </div>
  );
};

export default MainSection;
