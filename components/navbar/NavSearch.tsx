"use client";

import { LuSearch } from "react-icons/lu";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function NavSearch() {
  const newSearchParams = new URLSearchParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const debounced = useDebouncedCallback((value: string) => {
    newSearchParams.set("search", value);
    router.push(`/files?${newSearchParams.toString()}`);
  }, 500);
  function handleChange(value: string) {
    setSearchText(value);
    debounced(value);
  }

  useEffect(() => {
    setSearchText(searchParams.get("search") || "");
  }, [searchParams.get("search")]);

  return (
    <div className="relative max-w-md xl:max-w-full w-full">
      <Input
        type="text"
        placeholder="Search files..."
        value={searchText}
        onChange={(e) => handleChange(e.target.value)}
        className="lg:h-10 w-full px-4 rounded-3xl shadow-sm border focus-visible:ring-primary bg-primary/10 text-black tracking-wide text-sm xl:text-base"
      />
      <LuSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 xl:w-6 xl:h-6 text-muted-foreground" />
    </div>
  );
}
export default NavSearch;
