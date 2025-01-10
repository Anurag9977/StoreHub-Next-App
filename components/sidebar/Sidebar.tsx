"use client";

import authImage from "@/assets/authImage.svg";
import { chillax } from "@/utils/fonts";
import { navLinks } from "@/utils/links";
import { Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full flex flex-col justify-between">
      <div>
        <Link
          href="/"
          className={`${chillax.className} h-24 flex items-center gap-x-2 text-primary`}
        >
          <Layers strokeWidth={3} className="w-5 h-5 xl:w-6 xl:h-6" />
          <h1 className="text-lg xl:text-xl font-bold tracking-wide">
            StoreHub
          </h1>
        </Link>
        <div className="pt-8">
          {navLinks.map((link, index) => {
            const { href, label } = link;
            const isActive = href === pathname;
            return (
              <Link
                key={index}
                href={href}
                className={`flex items-center gap-3 py-3 my-1 px-4 xl:px-6 rounded-3xl ${
                  chillax.className
                } capitalize tracking-wide text-sm xl:text-base font-medium ${
                  isActive
                    ? "bg-primary text-background font-semibold"
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
    </aside>
  );
}
export default Sidebar;
