"use client";

import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { fileOptions, FileOptionType } from "@/utils/links";
import { Fragment, useState } from "react";
import Link from "next/link";
import { appwriteConfig } from "@/utils/appwrite/config";
import { Models } from "node-appwrite";
import DialogWrapper from "./DialogWrapper";

function FileOptions({ file }: { file: Models.Document }) {
  const { endpoint, bucketID, projectID } = appwriteConfig;
  const downloadLink = `${endpoint}/storage/buckets/${bucketID}/files/${file.bucketFieldID}/download?project=${projectID}&project=${projectID}&mode=admin`;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeOption, setActiveOption] = useState<FileOptionType>("rename");

  function handleOptionsClick(label: FileOptionType) {
    setIsOptionsOpen(false);
    if (label !== "download") {
      setActiveOption(label);
      setIsDialogOpen(true);
    }
  }

  return (
    <>
      <DropdownMenu
        open={isOptionsOpen}
        onOpenChange={(open) => setIsOptionsOpen(open)}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <PiDotsThreeOutlineVerticalLight />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {fileOptions.map((option) => {
            if (option.label === "download") {
              return (
                <DropdownMenuItem key={option.label} asChild>
                  <Link
                    href={downloadLink}
                    target="_blank"
                    className="font-medium capitalize cursor-pointer"
                  >
                    {<option.icon />} {option.label}
                  </Link>
                </DropdownMenuItem>
              );
            }
            return (
              <DropdownMenuItem
                key={option.label}
                className="font-medium capitalize cursor-pointer"
                onClick={(e) => handleOptionsClick(option.label)}
              >
                {<option.icon />} {option.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogWrapper
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        optionType={activeOption}
        file={file}
      />
    </>
  );
}
export default FileOptions;
