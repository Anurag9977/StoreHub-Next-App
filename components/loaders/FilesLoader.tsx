import MainContainer from "../globals/MainContainer";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

function FilesLoader() {
  return (
    <MainContainer className="py-8">
      <Skeleton className="h-10 w-28" />
      <Skeleton className="h-8 w-24 mt-2" />
      <section className="mt-4">
        <div className="mt-8 flex justify-between items-center">
          <Skeleton className="h-6 w-20" />
          <div className="hidden md:flex items-center gap-x-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
        <Separator className="mt-2 mb-4 bg-slate-300" />
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </section>
      </section>
    </MainContainer>
  );
}
export default FilesLoader;
