import { FilesLayoutType } from "@/utils/types";
import { Models } from "node-appwrite";
import { Separator } from "../ui/separator";
import FilesLayout from "./FilesLayout";
import FilesGrid from "./FilesGrid";
import FilesList from "./FilesList";
import FilesSort from "./FilesSort";

function FilesContainer({
  documents,
  total,
  layout,
}: {
  documents: Models.Document[];
  total: number;
  layout: FilesLayoutType;
}) {
  return (
    <>
      <div className="mt-8 flex justify-between items-center">
        <h3 className="font-medium text-base md:text-lg tracking-wide">
          {total} File{total > 1 ? "s" : ""} found
        </h3>
        <div className="flex items-center gap-x-4">
          <FilesSort />
          <div className="hidden md:block">
            <FilesLayout />
          </div>
        </div>
      </div>
      <Separator className="mt-2 mb-4 bg-slate-300" />
      {layout === "grid" ? (
        <FilesGrid files={documents} />
      ) : (
        <FilesList files={documents} />
      )}
    </>
  );
}
export default FilesContainer;
