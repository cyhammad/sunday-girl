"use client";

import React from "react";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
  src: "../fonts/degular/DegularDemo-Semibold.otf",
});

const LogoutDialog = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here (e.g., clear session/cookies)
    router.push("/admin/sign-in");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[440px] p-0 gap-0 bg-white rounded-[24px] border-none shadow-[0px_4px_40px_0px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          {/* Icon Circle */}
          <div className="w-[64px] h-[64px] rounded-full bg-[#FAFAFA] flex items-center justify-center mb-4">
            <LogOut className="w-7 h-7 text-[#24282E]" strokeWidth={1.5} />
          </div>

          <DialogHeader className="mb-6 space-y-2">
            <DialogTitle
              className={`${degular.className} text-[22px] text-[#24282E] text-center`}
            >
              Logout
            </DialogTitle>
            <DialogDescription
              className={`${inter.className} text-[15px] text-[#6C6C6C] text-center`}
            >
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-4 w-full">
            <DialogClose asChild>
              <button
                className={`${inter.className} flex-1 h-[48px] rounded-[14px] border border-[#E07386] text-[#E07386] text-[15px] font-semibold hover:bg-[#FFF5F7] transition-colors`}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleLogout}
              className={`${inter.className} flex-1 h-[48px] rounded-[14px] bg-[#E07386] text-white text-[15px] font-semibold hover:bg-[#D06376] transition-colors shadow-[0px_4px_12px_rgba(224,115,134,0.2)]`}
            >
              Yes Logout
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
