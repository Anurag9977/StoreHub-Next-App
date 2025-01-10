import { IconType } from "react-icons";
import {
  LuArrowBigDownDash,
  LuFilePen,
  LuInfo,
  LuShare2,
  LuTrash2,
} from "react-icons/lu";
import { JSX } from "react";

//Nav icons svg
import Dashboard from "@/components/file-type-icons/Dashboard";
import Documents from "@/components/file-type-icons/Documents";
import Images from "@/components/file-type-icons/Images";
import Media from "@/components/file-type-icons/Media";
import Others from "@/components/file-type-icons/Others";

type NavIconType = ({
  fillColorClass,
}: {
  fillColorClass: string;
}) => JSX.Element;

type NavLink = {
  label: string;
  icon: NavIconType;
  href: string;
};

export const navLinks: NavLink[] = [
  {
    label: "dashboard",
    icon: Dashboard,
    href: "/",
  },
  {
    label: "documents",
    icon: Documents,
    href: "/documents",
  },
  {
    label: "images",
    icon: Images,
    href: "/images",
  },
  {
    label: "media",
    icon: Media,
    href: "/media",
  },
  {
    label: "others",
    icon: Others,
    href: "/others",
  },
];

export type FileOptionType =
  | "rename"
  | "share"
  | "info"
  | "download"
  | "delete";

export type FileOption = {
  label: FileOptionType;
  icon: IconType;
};

export const fileOptions: FileOption[] = [
  {
    label: "rename",
    icon: LuFilePen,
  },
  {
    label: "share",
    icon: LuShare2,
  },
  {
    label: "info",
    icon: LuInfo,
  },
  {
    label: "download",
    icon: LuArrowBigDownDash,
  },
  {
    label: "delete",
    icon: LuTrash2,
  },
];

export const sortOptions = [
  {
    label: "Latest",
    value: "latest",
  },
  {
    label: "Name (a-z)",
    value: "a-z",
  },
  {
    label: "Name (z-a)",
    value: "z-a",
  },
  {
    label: "Size (Largest)",
    value: "l-s",
  },
  {
    label: "Size (Smallest)",
    value: "s-l",
  },
];
