import { Models } from "node-appwrite";
import ThumbnailContainer from "../file-upload/thumbnail/ThumbnailContainer";
import FileOptions from "../file-card/FileOptions";
import Link from "next/link";
import { formatDateTime } from "@/utils/format";

function FileCard({ file }: { file: Models.Document }) {
  const { name, url, type, extension, $updatedAt } = file;
  const lastUpdatedDate = new Date($updatedAt);
  const formattedName =
    name.length > 35
      ? name.substring(0, 35) + "..." + extension
      : name + "." + extension;
  return (
    <article className="w-full flex justify-between items-center gap-x-4 my-3 p-4 rounded-xl border border-muted shadow-sm">
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-4">
        <ThumbnailContainer
          fileType={type}
          extension={extension}
          url={url}
          thumbnailSize="sm"
        />
        <div className="flex flex-col truncate">
          <Link
            href={url}
            target="_blank"
            className="text-sm font-medium hover:underline duration-300 truncate"
          >
            {formattedName}
          </Link>
          <span className="mt-1 text-xs italic">
            {formatDateTime(lastUpdatedDate)}
          </span>
        </div>
      </div>
      <FileOptions file={file} />
    </article>
  );
}
export default FileCard;
