"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserDetailsDialog from "./_components/UserDetailsDialog";
import RestrictUserDialog from "./_components/RestrictUserDialog";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const usersData = [
  {
    name: "Lana Delorse",
    phone: "555-293-0485",
    status: "Active",
    dateJoined: "10/12/2022",
    practices: "10",
  },
  {
    name: "Kira Onassis",
    phone: "555-857-3957",
    status: "Restricted",
    dateJoined: "08/01/2023",
    practices: "23",
  },
  {
    name: "Ayo Segunda",
    phone: "555-285-8593",
    status: "Active",
    dateJoined: "02/23/2023",
    practices: "12",
  },
  {
    name: "Lia Telma",
    phone: "555-746-9257",
    status: "Active",
    dateJoined: "01/01/2024",
    practices: "23",
  },
  {
    name: "Lia Malone",
    phone: "555-264-7584",
    status: "Inactive",
    dateJoined: "03/04/2023",
    practices: "1",
  },
  {
    name: "Lia Malone",
    phone: "555-395-2759",
    status: "Inactive",
    dateJoined: "04/12/2022",
    practices: "2",
  },
  {
    name: "Lia Malone",
    phone: "555-824-6385",
    status: "Active",
    dateJoined: "09/11/2023",
    practices: "1",
  },
];

const emailData = [
  "Olivia.Smith34@gmail.com",
  "Quentin.Schmeler@gmail.com",
  "Antonette_OHara@gmail.com",
  "Brigitte.Harber78@gmail.com",
  "Newell62@gmail.com",
  "Elmer_Baumbach@gmail.com",
  "днем..Henry@gmail.com",
  "Anabelle.Metz58@gmail.com",
  "Cordelia.Bogan@gmail.com",
  "Jayson.Cronin@gmail.com",
  "Arnulfo.Berge@gmail.com",
  "Kiana.Kuhlman@gmail.com",
];

const UserManagementPage = () => {
  const [activeTab, setActiveTab] = useState("All Users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRestrictOpen, setIsRestrictOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabs = ["All Users", "Emails"];

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-[#FFFFFF]">
      <div className="w-full">
        <h1 className={`${degular.className} text-[32px] text-[#24282E] mb-10`}>
          User Management
        </h1>

        {/* Tabs Container */}
        <div className="inline-flex p-1.5 bg-[#F9F9F9] rounded-[30px] mb-8 border border-[#F2F2F2]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-[25px] text-[14px] font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "text-[#E07386] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] border border-[#F2F2F2]"
                  : "text-[#8F8F8F] hover:text-[#6C6C6C]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[20px] border border-[#F2F2F2] overflow-hidden shadow-[0px_4px_30px_rgba(0,0,0,0.03)]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#F9F9F9]/50 border-b border-[#F2F2F2]">
                <TableRow className="hover:bg-transparent border-none">
                  {activeTab === "Emails" ? (
                    <TableHead
                      className={`${inter.className} px-8 py-5 text-[15px] font-semibold text-[#24282E] h-auto`}
                    >
                      Emails
                    </TableHead>
                  ) : (
                    <>
                      <TableHead
                        className={`${inter.className} px-8 py-5 text-[15px] font-semibold text-[#24282E] h-auto`}
                      >
                        Name
                      </TableHead>
                      <TableHead
                        className={`${inter.className} px-8 py-5 text-[15px] font-semibold text-[#24282E] h-auto`}
                      >
                        Phone
                      </TableHead>
                      <TableHead
                        className={`${inter.className} px-8 py-5 text-[15px] font-semibold text-[#24282E] h-auto`}
                      >
                        Account Status
                      </TableHead>
                      <TableHead
                        className={`${inter.className} px-8 py-5 text-[15px] font-semibold text-[#24282E] h-auto`}
                      >
                        Date Joined
                      </TableHead>
                      <TableHead
                        className={`${inter.className} px-8 py-5 text-[15px] font-semibold text-[#24282E] h-auto`}
                      >
                        Practices Joined
                      </TableHead>
                      <TableHead
                        className={`${inter.className} px-8 py-5 text-[15px] font-semibold text-[#24282E] h-auto`}
                      >
                        Action
                      </TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTab === "Emails"
                  ? emailData.map((email, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/30 transition-colors"
                      >
                        <TableCell className="px-8 py-7 text-[16px] text-[#525252] font-medium">
                          {email}
                        </TableCell>
                      </TableRow>
                    ))
                  : usersData.map((user, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/30 transition-colors"
                      >
                        <TableCell className="px-8 py-7 text-[16px] text-[#525252] font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                          {user.phone}
                        </TableCell>
                        <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                          {user.status}
                        </TableCell>
                        <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                          {user.dateJoined}
                        </TableCell>
                        <TableCell className="px-8 py-7 text-[16px] text-[#6C6C6C]">
                          {user.practices}
                        </TableCell>
                        <TableCell className="px-8 py-7">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDetailsOpen(true);
                            }}
                            className="text-[#E07386] text-[15px] font-bold flex items-center gap-1.5 group transition-colors"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <UserDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        user={selectedUser}
        onRestrict={() => {
          setIsDetailsOpen(false);
          setIsRestrictOpen(true);
        }}
      />

      <RestrictUserDialog
        isOpen={isRestrictOpen}
        onOpenChange={setIsRestrictOpen}
        user={selectedUser}
        onConfirm={(user) => {
          console.log("Restricting user:", user);
          setIsRestrictOpen(false);
        }}
      />
    </div>
  );
};

export default UserManagementPage;
