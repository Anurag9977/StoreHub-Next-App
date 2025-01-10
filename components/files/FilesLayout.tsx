"use client";

import { Button } from "../ui/button";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function FilesLayout() {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { push } = useRouter();
  const [layout, setLayout] = useState("");

  useEffect(() => {
    setLayout(searchParams.get("layout") || "grid");
  }, [searchParams.get("layout")]);

  function handleChangeLayout(value: string) {
    newSearchParams.set("layout", value);
    push(`${pathname}?${newSearchParams.toString()}`);
  }
  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant={layout === "grid" ? "default" : "outline"}
        size="icon"
        onClick={() => handleChangeLayout("grid")}
      >
        <LuLayoutGrid />
      </Button>
      <Button
        variant={layout === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => handleChangeLayout("list")}
      >
        <LuLayoutList />
      </Button>
    </div>
  );
}
export default FilesLayout;
