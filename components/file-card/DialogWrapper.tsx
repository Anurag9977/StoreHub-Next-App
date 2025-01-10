import { FileOptionType } from "@/utils/links";
import { Dispatch, SetStateAction } from "react";
import FileOptionsDialog from "./FileOptionsDialog";
import FileRename from "../file-options/FileRename";
import FileInfo from "../file-options/FileInfo";
import FileShare from "../file-options/FileShare";
import FileDelete from "../file-options/FileDelete";
import { Models } from "node-appwrite";

function DialogWrapper({
  isOpen,
  setIsOpen,
  optionType,
  file,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  optionType: FileOptionType;
  file: Models.Document;
}) {
  switch (optionType) {
    case "rename":
      return (
        <FileOptionsDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          optionsDialog={{
            heading: "rename",
            description:
              "Enter the new name for the file and save the changes.",
            component: <FileRename file={file} setIsOpen={setIsOpen} />,
          }}
        />
      );
    case "info":
      return (
        <FileOptionsDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          optionsDialog={{
            heading: "File Information",
            component: <FileInfo file={file} />,
          }}
        />
      );
    case "share":
      return (
        <FileOptionsDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          optionsDialog={{
            heading: "share",
            description:
              "Enter the email IDs separated by commas to share the file.",
            component: <FileShare file={file} />,
          }}
        />
      );
    case "delete":
      return (
        <FileOptionsDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          optionsDialog={{
            heading: "delete",
            component: <FileDelete file={file} setIsOpen={setIsOpen} />,
          }}
        />
      );
  }
  return (
    <FileOptionsDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      optionsDialog={{
        heading: "rename",
        description: "rename file",
        component: <h1>Something went wrong!</h1>,
      }}
    />
  );
}
export default DialogWrapper;
