import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const ImSoInButton = ({ size = "lg", className }) => {
  return (
    <Button size={size} className={cn("text-xl", className)}>
      I'm so in
      <ArrowRight strokeWidth={3} className="size-5" />
    </Button>
  );
};

export default ImSoInButton;
