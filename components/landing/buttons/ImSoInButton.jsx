import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ImSoInButton = ({ size = "lg", className }) => {
  return (
    <Button size={size} className={cn("text-base sm:text-xl h-12 px-4 sm:px-6 py-4 gap-1 sm:gap-2", className)}>
      I'm so in
      <Image src="/arrow.png" quality={100} width={24} height={24} className="size-3 sm:size-4" alt="Arrow" />
    </Button>
  );
};

export default ImSoInButton;
