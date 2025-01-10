import { Skeleton } from "../ui/skeleton";

function FilesGridLoader() {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-4">
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </section>
  );
}
export default FilesGridLoader;
