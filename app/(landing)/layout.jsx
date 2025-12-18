import Header from "@/components/landing/header/Header";
import Footer from "@/components/landing/footer/Footer";
import React from "react";

const LandingLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full bg-[#FFF5E7] min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
