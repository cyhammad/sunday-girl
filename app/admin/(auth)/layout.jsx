"use client";

import localFont from "next/font/local";

const canela = localFont({
  src: "../../../components/fonts/canela/CanelaText-Bold-Trial.otf",
});

const AdminAuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen w-full md:min-w-[464.15px] flex flex-col items-center justify-center p-4 md:p-0"
      style={{
        background:
          "linear-gradient(359.79deg, #FDFAF6 78.62%, #F7CF9E 117.78%)",
      }}
    >
      {/* --- Logo Section --- */}
      <div className="my-8">
        <h1 className={`${canela.className} text-[40px] text-[#FF007A]`}>
          Sunday Girl
        </h1>
      </div>

      {/* --- Dynamic Content Section --- */}
      <div className="w-full max-w-[464.15px]">{children}</div>
    </div>
  );
};

export default AdminAuthLayout;
