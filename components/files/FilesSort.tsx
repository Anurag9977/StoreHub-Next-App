"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { sortOptions } from "@/utils/links";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilesSort() {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { push } = useRouter();
  const [sort, setSort] = useState("");

  useEffect(() => {
    setSort(searchParams.get("sort") || "latest");
  }, [searchParams.get("sort")]);

  return (
    <Select
      value={sort}
      onValueChange={(value) => {
        newSearchParams.set("sort", value);
        push(`${pathname}?${newSearchParams.toString()}`);
      }}
    >
      <SelectTrigger className="w-[155px] md:w-[180px] tracking-wider bg-primary/10 font-medium text-sm md:text-base">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option, index) => {
          return (
            <SelectItem
              key={index}
              value={option.value}
              className="tracking-wider cursor-pointer font-medium"
            >
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
export default FilesSort;
