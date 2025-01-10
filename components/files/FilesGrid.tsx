import { Models } from "node-appwrite";
import FileCard from "../file-card/FileCard";

function FilesGrid({ files }: { files: Models.Document[] }) {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-4">
      {files.map((file) => {
        return <FileCard key={file.$id} file={file} />;
      })}
    </section>
  );
}
export default FilesGrid;
