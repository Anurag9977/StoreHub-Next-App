import { Layers } from "lucide-react";
import Sidebar from "./Sidebar";
import NavSearch from "../navbar/NavSearch";
import Link from "next/link";
import { chillax } from "@/utils/fonts";

function MobileNavigation({
  avatar,
  firstName,
  $id: ownerID,
  accountID,
}: {
  avatar: string;
  firstName: string;
  $id: string;
  accountID: string;
}) {
  return (
    <section className="py-4 flex justify-between items-center gap-x-6">
      <Link
        href="/"
        className={`${chillax.className} flex items-center gap-x-2 text-primary`}
      >
        <Layers size={22} />
        <h1 className="text-lg xl:text-xl font-bold tracking-wide">StoreHub</h1>
      </Link>
      <NavSearch />
      <Sidebar
        avatar={avatar}
        firstName={firstName}
        ownerID={ownerID}
        accountID={accountID}
      />
    </section>
  );
}
export default MobileNavigation;
