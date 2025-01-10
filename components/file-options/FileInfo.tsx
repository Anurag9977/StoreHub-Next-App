import { getSizeInMB } from "@/lib/utils";
import { formatDateTime } from "@/utils/format";
import { Models } from "node-appwrite";
import { Separator } from "../ui/separator";

function FileInfo({ file }: { file: Models.Document }) {
  const { name, extension, size, $updatedAt, owner } = file;
  return (
    <article className="flex flex-col">
      <div className="flex flex-wrap justify-between items-center text-sm">
        <p className="font-semibold tracking-wide">Name</p>
        <p className="font-medium">{name}</p>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between items-center text-sm">
        <p className="font-semibold tracking-wide">Extension</p>
        <p className="font-medium">{extension}</p>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between items-center text-sm">
        <p className="font-semibold tracking-wide">Size</p>
        <p className="font-medium">{getSizeInMB(size)} MB</p>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between items-center text-sm">
        <p className="font-semibold tracking-wide">Last updated</p>
        <p className="font-medium">{formatDateTime(new Date($updatedAt))}</p>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between items-center text-sm">
        <p className="font-semibold tracking-wide">Owner</p>
        <p className="font-medium">{owner.firstName}</p>
      </div>
    </article>
  );
}
export default FileInfo;
