import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-end px-5 py-3 sm:py-4 self-center max-w-360 w-full">
      <Link href="#section3">
      <Button className={cn("text-base sm:text-2xl tracking-normal h-12 px-4 sm:px-6 py-4 gap-1 sm:gap-2")}>
        I'm so in
        <Image src="/arrow.png" width={24} height={24} className="size-3 sm:size-4" alt="Arrow" />
      </Button>
      </Link>
    </div>
  );
};

export default Header;
