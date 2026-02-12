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

const SignInPage = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      {/* Heading */}
      <h1
        className={`${degular.className} text-[40px] mb-[40px] text-[#24282E] text-center font-light`}
      >
        Sign In
      </h1>

      <form className={`flex flex-col gap-2 ${inter.className}`}>
        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <label className="text-[#717171] text-[15px]">Email</label>
          <input
            type="email"
            placeholder="Enter"
            className="w-full h-[50px] bg-white border border-[#EDEDED] rounded-[10px] px-5 py-4 text-gray-900 placeholder:text-gray-300 focus:ring-[#E07386] focus:border-[#E07386] outline-none text-[15px] transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <label className="text-[#717171] text-[15px]">Password</label>
          <input
            type="password"
            placeholder="Enter"
            className="w-full h-[50px] bg-white border border-[#EDEDED] rounded-[10px] px-5 py-4 text-gray-900 placeholder:text-gray-300 focus:ring-[#E07386] focus:border-[#E07386] outline-none text-[15px] transition-all"
          />
        </div>

        {/* Forgot Password Link */}
        <Link
          href="/admin/forgot-password"
          className="text-[#E07386] font-medium text-[12px] ml-[20px] hover:text-[#c96576] transition-colors self-start"
        >
          Forgot Password?
        </Link>

        {/* Continue Button */}
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="w-full mt-12 bg-[#E07386] hover:bg-[#c96576] text-white font-normal text-[16px] py-4 rounded-2xl transition-all shadow-[0_4px_14px_0_rgba(224,115,134,0.39)] hover:shadow-[0_6px_20px_rgba(224,115,134,0.23)] active:scale-[0.98]"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
