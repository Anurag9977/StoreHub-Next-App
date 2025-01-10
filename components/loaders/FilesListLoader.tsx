import { Skeleton } from "../ui/skeleton";

function FilesListLoader() {
  return (
    <section className="grid gap-y-4">
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </section>
  );
}
export default FilesListLoader;
