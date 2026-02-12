"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const inter = Inter({ subsets: ["latin"] });

const NewPasswordPage = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      {/* Heading */}
      <h1
        className={`${degular.className} text-[40px] mb-[40px] text-[#24282E] text-center font-light`}
      >
        New Password
      </h1>

      <h2
        className={`text-[18px] font-medium text-[#24282E] mb-6 ${inter.className}`}
      >
        Enter new password
      </h2>

      <form className={`flex flex-col gap-2 ${inter.className}`}>
        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <label className="text-[#717171] text-[15px]">Password</label>
          <input
            type="password"
            placeholder="Enter"
            className="w-full h-[50px] bg-white border border-[#EDEDED] rounded-[10px] px-5 py-4 text-gray-900 placeholder:text-gray-300 focus:ring-[#E07386] focus:border-[#E07386] outline-none text-[15px] transition-all"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[#717171] text-[15px]">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter"
            className="w-full h-[50px] bg-white border border-[#EDEDED] rounded-[10px] px-5 py-4 text-gray-900 placeholder:text-gray-300 focus:ring-[#E07386] focus:border-[#E07386] outline-none text-[15px] transition-all"
          />
        </div>

        {/* Remember Password Link */}
        <div className="text-[12px] mt-1 ml-[5px]">
          <span className="text-[#717171]">Remember Password? </span>
          <Link
            href="/admin/sign-in"
            className="text-[#E07386] font-medium hover:text-[#c96576] transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={() => router.push("/admin/sign-in")}
          className="w-full mt-8 bg-[#E07386] hover:bg-[#c96576] text-white font-normal text-[16px] py-4 rounded-2xl transition-all shadow-[0_4px_14px_0_rgba(224,115,134,0.39)] hover:shadow-[0_6px_20px_rgba(224,115,134,0.23)] active:scale-[0.98]"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
