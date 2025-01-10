import { getSizeInMB } from "@/lib/utils";
import { formatDateTime } from "@/utils/format";
import Link from "next/link";
import { Models } from "node-appwrite";
import { getCurrentUser } from "@/utils/actions";
import FileOptions from "../file-card/FileOptions";
import ThumbnailContainer from "../file-upload/thumbnail/ThumbnailContainer";

async function FileListItem({ file }: { file: Models.Document }) {
  const user = await getCurrentUser();
  const { name, url, size, type, extension, $updatedAt } = file;
  const lastUpdatedDate = new Date($updatedAt);
  const formattedName =
    name.length > 50
      ? name.substring(0, 50) + "..." + extension
      : name + "." + extension;
  return (
    <article className="bg-background p-4 rounded-xl shadow-sm">
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <ThumbnailContainer
            fileType={type}
            extension={extension}
            url={url}
            thumbnailSize="lg"
          />
          <div className="flex flex-col gap-y-1">
            <Link
              href={url}
              target="_blank"
              className="font-medium tracking-wide hover:underline duration300"
            >
              {formattedName}
            </Link>
            <span className="text-sm italic">
              {formatDateTime(lastUpdatedDate)}
            </span>
            <span className="text-sm italic">{getSizeInMB(size)} MB</span>
            {user.payload.$id !== file.owner.$id && (
              <p className="text-xs text-slate-500">
                Shared by : {file.owner.firstName}
              </p>
            )}
          </div>
        </div>
        <FileOptions file={file} />
      </div>
    </article>
  );
}
export default FileListItem;
