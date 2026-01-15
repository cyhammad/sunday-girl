import React from "react";
import { YoutubeIcon, InstagramIcon, MailIcon } from "@/icons/landing-icons";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    {
      icon: <YoutubeIcon />,
      href: "https://www.youtube.com/sadoraparis",
    },
    {
      icon: <InstagramIcon />,
      href: "https://instagram.com/sadoraparis",
    },
    {
      icon: <MailIcon />,
      href: "mailto:hello@sundaygirl.space",
    },
  ];
  return (
    <footer className="self-center max-w-[312px] flex flex-col items-center justify-center text-center gap-5 sm:gap-8 sm:pt-13 pb-4.5 pt-4 sm:pb-8">
      <div className="flex items-center justify-center gap-6">
        {socialLinks.map((link) => (
          <Link
            className="text-primary hover:text-pink-600 transition-all ease-in-out duration-300"
            target="_blank"
            href={link.href}
            key={link.href}
          >
            {link.icon}
          </Link>
        ))}
      </div>
      <p className="text-sm text-[#9D9D9D]">
        © 2025 – 2026 - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
