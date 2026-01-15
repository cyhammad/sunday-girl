import React from "react";
import ImSoInButton from "@/components/landing/buttons/ImSoInButton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const MainSection = () => {
  return (
    <div
      className="flex w-full sm:gap-6 gap-2 flex-col text-center text-white items-center justify-center min-h-[771px] sm:min-h-[632px] h-full bg-cover bg-bottom bg-[url('/main-bg-mobile.png')] sm:bg-[url('/main-bg.png')]"
    >
      <h1 className="text-[42px] sm:text-[52px] tracking-tight font-bold pt-2">This one's for us.</h1>
      <p className="text-[26px] leading-[30px] sm:text-[40px] max-w-[362px] sm:max-w-none tracking-normal font-light text-[#ECECEC]">
        The space we've craved but never quite found.
      </p>
      <Button className="mt-5.5 sm:text-2xl tracking-normal h-[53px] sm:h-[63px] sm:w-[182px] w-[192px]">
        I'm so in
        <Image src="/arrow.png" quality={100} width={24} height={24} className="size-3 sm:size-6" alt="Arrow" />
      </Button>
    </div>
  );
};

export default MainSection;
