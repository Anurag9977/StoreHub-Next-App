import { Models } from "node-appwrite";
import FileCard from "./FileCard";
import { chillax } from "@/utils/fonts";

function RecentFiles({ documents }: { documents: Models.Document[] }) {
  const recentFiles =
    documents.length > 10 ? documents.slice(0, 10) : documents;
  return (
    <section className="overflow-hidden bg-background px-6 py-4 rounded-xl">
      <h1
        className={`${chillax.className} text-xl capitalize font-semibold tracking-wide`}
      >
        {recentFiles.length > 0
          ? "recent files uploaded"
          : "no files uploaded yet"}
      </h1>
      <div>
        {recentFiles.map((file) => (
          <FileCard key={file.$id} file={file} />
        ))}
      </div>
    </section>
  );
}
export default RecentFiles;
