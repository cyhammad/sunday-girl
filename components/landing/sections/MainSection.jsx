import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/icons/landing-icons";

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
      <h1 className="text-[42px] md:text-[52px] tracking-tight font-bold pt-2 relative z-10">This one's for us.</h1>
      <p className="text-[25px] leading-[30px] sm:text-[40px] max-w-[362px] sm:max-w-none tracking-normal font-light text-[#ECECEC] relative z-10">
        The space we've craved but never quite found.
      </p>
      <Link href="/#section3">
        <Button className="mt-5.5 text-xl tracking-normal h-[58px] w-[165px] relative z-10 gap-1">
          I'm so in
          <ArrowIcon className="size-5" />
        </Button>
      </Link>
    </div>
  );
};

export default MainSection;

