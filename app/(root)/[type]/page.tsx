import FilesContainer from "@/components/files/FilesContainer";
import EmptyList from "@/components/globals/EmptyList";
import MainContainer from "@/components/globals/MainContainer";
import { getSizeInMB } from "@/lib/utils";
import { getFilesByType } from "@/utils/actions";
import { chillax } from "@/utils/fonts";
import { FilesLayoutType, FilesSortType, FileType } from "@/utils/types";

async function FilesPage({
  params,
  searchParams,
}: {
  params: { type: FileType };
  searchParams: {
    layout: FilesLayoutType | undefined;
    sort: FilesSortType | undefined;
  };
}) {
  const { type } = await params;
  const { layout, sort } = await searchParams;

  const { documents, total, totalSize } = await getFilesByType({
    type,
    sort: sort || "latest",
  });

  return (
    <MainContainer className="py-8">
      {total > 0 ? (
        <>
          <h1
            className={`${chillax.className} font-semibold text-3xl capitalize`}
          >
            {type}
          </h1>
          <p className="text-xs mt-2">Total : {getSizeInMB(totalSize)} MB</p>
          <section className="mt-4">
            <FilesContainer
              documents={documents}
              total={total}
              layout={layout || "grid"}
            />
          </section>
        </>
      ) : (
        <EmptyList heading="No files available in this category." message="" />
      )}
    </MainContainer>
  );
}
export default FilesPage;
