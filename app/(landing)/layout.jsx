import Header from "@/components/landing/header/Header";
import Footer from "@/components/landing/footer/Footer";
import React from "react";
import Script from "next/script";

const LandingLayout = ({ children }) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <div className="flex flex-col w-full h-full bg-[#FFF5E7] min-h-screen">
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      )}
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
