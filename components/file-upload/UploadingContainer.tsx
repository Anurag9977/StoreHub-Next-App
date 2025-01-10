import { getExtension, getFileType } from "@/lib/utils";
import ThumbnailContainer from "./thumbnail/ThumbnailContainer";

function UploadingContainer({ files }: { files: File[] }) {
  return (
    <div className="absolute right-9 bottom-7 md:right-11 md:bottom-9 lg:right-14 lg:bottom-11 z-10 w-96 bg-background rounded-xl shadow-sm py-4 px-6">
      <h2 className="font-semibold text-base">
        Uploading {files.length} files...
      </h2>
      <ul>
        {files.map((file, index) => {
          const { name } = file;
          const fileExtension = getExtension(name);
          const fileType = getFileType(name);
          const imageURL =
            fileType === "images" ? URL.createObjectURL(file) : "";
          return (
            <li key={index} className="shadow-sm border p-4 rounded-xl my-2">
              <div className="flex items-center gap-x-2">
                <ThumbnailContainer
                  fileType={fileType}
                  extension={fileExtension}
                  url={imageURL}
                />
                <h4 className="text-sm">
                  {name.length > 20
                    ? name.substring(0, 20) +
                      "..." +
                      name.substring(name.length - 4)
                    : name}
                </h4>
              </div>
              <div className="mt-2 relative h-1 w-full bg-muted rounded-xl">
                <div className="absolute h-1 w-1/4 bg-primary rounded-xl animate-run"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default UploadingContainer;
