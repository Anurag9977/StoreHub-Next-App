import { Models } from "node-appwrite";
import FileListItem from "../file-list-item/FileListItem";

function FilesList({ files }: { files: Models.Document[] }) {
  return (
    <section className="grid gap-y-4">
      {files.map((file) => {
        return <FileListItem key={file.$id} file={file} />;
      })}
    </section>
  );
}
export default FilesList;
