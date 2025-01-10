import { getSizeInMB } from "@/lib/utils";
import { formatDateTime } from "@/utils/format";
import Link from "next/link";
import FileOptions from "./FileOptions";
import { Models } from "node-appwrite";
import { getCurrentUser } from "@/utils/actions";
import ThumbnailContainer from "../file-upload/thumbnail/ThumbnailContainer";

async function FileCard({ file }: { file: Models.Document }) {
  const user = await getCurrentUser();
  const { name, url, size, type, extension, $updatedAt } = file;
  const lastUpdatedDate = new Date($updatedAt);
  const formattedName =
    name.length > 20
      ? name.substring(0, 20) + "..." + extension
      : name + "." + extension;
  return (
    <article className="bg-background p-4 rounded-xl shadow-sm">
      <div className="mb-2 flex justify-between">
        <ThumbnailContainer fileType={type} extension={extension} url={url} />
        <FileOptions file={file} />
      </div>
      <Link
        href={url}
        target="_blank"
        className="text-sm font-medium hover:underline duration-300"
      >
        {formattedName}
      </Link>
      <div className="mt-2 mb-3 flex justify-between text-xs italic">
        <span>{formatDateTime(lastUpdatedDate)}</span>
        <span>{getSizeInMB(size)} MB</span>
      </div>
      {user.payload.$id !== file.owner.$id && (
        <p className="text-xs text-slate-500">
          Shared by : {file.owner.firstName}
        </p>
      )}
    </article>
  );
}
export default FileCard;
