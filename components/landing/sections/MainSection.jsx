import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MainSection = () => {
  return (
    <div className="relative flex w-full sm:gap-6 gap-2 flex-col text-center text-white items-center justify-center min-h-[771px] sm:min-h-[632px] h-full overflow-hidden">
      {/* Mobile Background */}
      <Image
        src="/main-bg-mobile.png"
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom sm:hidden"
      />
      {/* Desktop Background */}
      <Image
        src="/main-bg.png"
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom hidden sm:block"
      />
      <h1 className="text-[42px] sm:text-[52px] tracking-tight font-bold pt-2 relative z-10">This one's for us.</h1>
      <p className="text-[26px] leading-[30px] sm:text-[40px] max-w-[362px] sm:max-w-none tracking-normal font-light text-[#ECECEC] relative z-10">
        The space we've craved but never quite found.
      </p>
      <Button className="mt-5.5 sm:text-2xl tracking-normal h-[53px] sm:h-[63px] sm:w-[182px] w-[192px] relative z-10">
        I'm so in
        <Image src="/arrow.png" width={24} height={24} className="size-3 sm:size-6" alt="Arrow" />
      </Button>
    </div>
  );
};

export default MainSection;

