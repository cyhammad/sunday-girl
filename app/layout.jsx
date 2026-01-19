import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sunday Girl",
  description:
    "Sunday Girl is a platform for girls to find their perfect outfit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} flex flex-col w-full h-full`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

