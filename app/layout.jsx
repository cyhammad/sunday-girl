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
    "A cozy corner of the internet where you slow down, choose yourself, and step into the life you want.",
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

