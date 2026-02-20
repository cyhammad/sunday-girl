"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import EditTermsDialog from "./_components/EditTermsDialog";

const inter = Inter({ subsets: ["latin"] });
const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const TermsAndConditionsPage = () => {
  // Initial data matching the layout style
  const [termsContent, setTermsContent] = useState(`Data Collection
We collect personal data such as names, email addresses, and usage information to improve our services and personalize user experiences.

Data Usage
Collected data is used for account management, service improvement, personalized content, and communication. We ensure data is processed securely and in accordance with privacy laws.

Policy Updates
Our policy is periodically reviewed and updated to reflect changes in our practices and legal requirements. Users will be notified of significant updates.`);

  const [isMounted, setIsMounted] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSaveTerms = (newContent) => {
    setTermsContent(newContent);
  };

  const renderContent = () => {
    return termsContent.split("\n\n").map((block, index) => {
      const lines = block.split("\n");
      const title = lines[0];
      const text = lines.slice(1).join("\n");

      return (
        <div key={index}>
          <h2 className="text-[16px] font-bold text-[#24282E] mb-2">{title}</h2>
          {text && (
            <p className="text-[15px] text-[#757575] leading-relaxed">{text}</p>
          )}
        </div>
      );
    });
  };

  return (
    <div className={`p-6 lg:p-10 min-h-screen bg-[#FFFFFF] ${inter.className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <h1 className={`${degular.className} text-[32px] text-[#24282E]`}>
          Terms & Conditions
        </h1>

        <Button
          onClick={() => setIsEditDialogOpen(true)}
          className="bg-[#E07386] hover:bg-[#d06376] text-white font-medium h-[44px] px-6 rounded-[10px] shadow-sm text-[15px]"
        >
          Edit Policy
        </Button>
      </div>

      <div className="max-w-[900px]">
        <div className="space-y-8">
          <div>
            <h2 className="text-[16px] font-bold text-[#24282E] mb-2">
              Introduction
            </h2>
          </div>
          {renderContent()}
        </div>
      </div>

      <EditTermsDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        initialContent={termsContent}
        onSave={handleSaveTerms}
      />
    </div>
  );
};

export default TermsAndConditionsPage;
