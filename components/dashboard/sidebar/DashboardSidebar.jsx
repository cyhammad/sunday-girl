"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  DashboardIcon,
  ContentManagementIcon,
  UserManagementIcon,
  SettingsIcon,
  PrivacyPolicyIcon,
  TermsIcon,
  CommunityIcon,
  NotificationsIcon,
  LogoutIcon,
} from "@/components/icons/icons";
import LogoutDialog from "@/components/dashboard/LogoutDialog";
import localFont from "next/font/local";

const canela = localFont({
  src: "../../fonts/canela/CanelaText-Bold-Trial.otf",
});

const menuItems = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    href: "/admin",
  },
  {
    title: "Content Management",
    icon: ContentManagementIcon,
    href: "/admin/content-management",
  },
  {
    title: "User Management",
    icon: UserManagementIcon,
    href: "/admin/user-management",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    href: "/admin/settings",
  },
  {
    title: "Privacy Policy",
    icon: PrivacyPolicyIcon,
    href: "/admin/privacy-policy",
  },
  {
    title: "Terms and Conditions",
    icon: TermsIcon,
    href: "/admin/terms-conditions",
  },
  {
    title: "Community Feed",
    icon: CommunityIcon,
    href: "/admin/community-feed",
  },
  {
    title: "Notifications",
    icon: NotificationsIcon,
    href: "/admin/notifications",
  },
];

// Reusable navigation component
const SidebarNav = ({ currentPath, onNavigate }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col w-full">
          <div className="mb-8 flex items-center justify-center">
            <h1 className={`${canela.className} text-[42px] text-[#FF007A]`}>
              Sunday Girl
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col w-full">
        <div className="mb-8 flex items-center justify-center">
          <h1 className={`${canela.className} text-[42px] text-[#FF007A]`}>
            Sunday Girl
          </h1>
        </div>

        <nav className="flex flex-col gap-[4px] mt-4 w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? currentPath === "/admin"
                : currentPath.startsWith(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 w-full h-[48px] rounded-[12px] px-4 transition-all duration-200 ${
                  isActive
                    ? "bg-[#E07386] text-white"
                    : "text-[#757575] hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`w-[22px] h-[22px] ${
                    isActive ? "text-white" : "text-[#757575]"
                  }`}
                />
                <span className="font-medium text-[15px]">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="w-full">
        <LogoutDialog>
          <button className="flex items-center justify-center gap-3 w-full h-[52px] text-[#757575] hover:text-[#E07386] hover:bg-gray-50 rounded-2xl transition-all duration-200">
            <LogoutIcon className="w-5 h-5" />
            <span className="font-medium text-[15px]">Logout</span>
          </button>
        </LogoutDialog>
      </div>
    </div>
  );
};

// Mobile Sidebar with Sheet
export function MobileSidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Menu className="w-6 h-6 text-[#1A1A1A]" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-6 bg-white">
        <VisuallyHidden.Root>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden.Root>
        <SidebarNav currentPath={pathname} onNavigate={() => {}} />
      </SheetContent>
    </Sheet>
  );
}

// Desktop Sidebar
export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[340px] h-full bg-white p-6 justify-between shrink-0">
      <SidebarNav currentPath={pathname} />
    </aside>
  );
}
