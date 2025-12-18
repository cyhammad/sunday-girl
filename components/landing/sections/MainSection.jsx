import React from "react";
import ImSoInButton from "@/components/landing/buttons/ImSoInButton";

const MainSection = () => {
  return (
    <div
      className="flex w-full gap-5 flex-col text-center text-white items-center justify-center min-h-[632px] h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/main-bg.png')" }}
    >
      <h1 className="text-5xl font-bold">This one's for us.</h1>
      <p className="text-4xl text-[#ECECEC]">
        The space we've craved but never quite found.
      </p>
      <ImSoInButton size="2xl" className="mt-4" />
    </div>
  );
};

export default MainSection;
