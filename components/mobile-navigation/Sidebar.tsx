"use client";

import { LucideSidebarOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { navLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserIcon from "../navbar/UserIcon";
import FileUpload from "../navbar/FileUpload";
import Image from "next/image";
import authImage from "@/assets/authImage.svg";
import { useState } from "react";
import { chillax } from "@/utils/fonts";

function Sidebar({
  avatar,
  firstName,
  ownerID,
  accountID,
}: {
  avatar: string;
  firstName: string;
  ownerID: string;
  accountID: string;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div>
      <Sheet
        onOpenChange={(open) => setIsSideBarOpen(open)}
        open={isSidebarOpen}
      >
        <SheetTrigger
          asChild
          className="h-9 w-9 bg-primary text-white rounded-xl p-2 hover:bg-accent hover:text-primary duration-300 cursor-pointer"
        >
          <LucideSidebarOpen size={22} />
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetTitle className="hidden"></SheetTitle>
          <div>
            <div className="my-6">
              {navLinks.map((link, index) => {
                const { href, label } = link;
                const isActive = href === pathname;
                return (
                  <Link
                    key={index}
                    href={href}
                    onClick={() => handleSidebarOpen()}
                    className={`flex items-center gap-3 py-3 my-1 px-6 rounded-3xl font-medium capitalize tracking-wide ${
                      chillax.className
                    } ${
                      isActive
                        ? "bg-primary text-input font-semibold"
                        : "text-black hover:bg-muted duration-300"
                    }`}
                  >
                    <link.icon
                      fillColorClass={
                        isActive ? "fill-background" : "fill-black/30"
                      }
                    />
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="grid grid-cols-2 items-center gap-x-4">
              <FileUpload
                ownerID={ownerID}
                accountID={accountID}
                handleSidebarOpen={handleSidebarOpen}
              />
              <UserIcon avatar={avatar} firstName={firstName} />
            </div>
          </div>
          <div className="relative h-40">
            <Image
              src={authImage}
              alt="authImage"
              fill
              priority
              sizes="50vw"
              className="object-contain"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
export default Sidebar;
