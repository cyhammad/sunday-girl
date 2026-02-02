import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowIcon } from "@/icons/landing-icons";

const Header = () => {
  return (
    <div className="flex items-center justify-end px-5 py-3 sm:py-4 self-center max-w-360 w-full">
      <Link href="/#section3">
        <Button className={cn("text-base md:text-xl tracking-normal w-[125px] md:w-[165px] h-12 md:h-14.5 px-4 sm:px-6 py-4 gap-1")}>
          I'm so in
          <ArrowIcon className="size-4.5 sm:size-5" />
        </Button>
      </Link>
    </div>
  );
};

export default Header;
