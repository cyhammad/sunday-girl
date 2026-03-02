import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { RecaptchaProvider } from "@/components/RecaptchaProvider";

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
      <head>
        {/* Preconnect to Vimeo so the hero video can start loading immediately */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://f.vimeocdn.com" />
      </head>
      <body className={`${dmSans.className} flex flex-col w-full h-full`}>
        <RecaptchaProvider>
          {children}
          <Toaster position="top-center" richColors />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
