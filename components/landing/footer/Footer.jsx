import React from "react";
import { TiktokIcon, InstagramIcon, MailIcon } from "@/icons/landing-icons";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    {
      icon: <TiktokIcon />,
      href: "https://www.tiktok.com/@sundaygirl",
    },
    {
      icon: <InstagramIcon />,
      href: "https://www.instagram.com/@sundaygirl",
    },
    {
      icon: <MailIcon />,
      href: "mailto:info@sundaygirl.com",
    },
  ];
  return (
    <footer className="self-center max-w-[312px] flex flex-col items-center justify-center text-center gap-8 py-9 pb-4.5">
      <div className="flex items-center justify-center gap-4">
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
      <p className="text-sm text-primary">
        © 2025 – 2026 - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
