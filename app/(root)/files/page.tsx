import FilesContainer from "@/components/files/FilesContainer";
import EmptyList from "@/components/globals/EmptyList";
import MainContainer from "@/components/globals/MainContainer";
import { getAllFiles } from "@/utils/actions";
import { chillax } from "@/utils/fonts";
import { FilesLayoutType, FilesSortType } from "@/utils/types";

async function AllFilesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    layout: FilesLayoutType | undefined;
    sort: FilesSortType | undefined;
  }>;
}) {
  const { search, layout, sort } = await searchParams;

  const { documents, total } = await getAllFiles({
    sort: sort || "latest",
    search: search || "",
  });

  return (
    <MainContainer className="py-8">
      {total > 0 ? (
        <>
          <h1
            className={`${chillax.className} font-semibold text-3xl capitalize`}
          >
            Files
          </h1>
          <section className="mt-4">
            <FilesContainer
              documents={documents}
              total={total}
              layout={layout || "grid"}
            />
          </section>
        </>
      ) : (
        <EmptyList
          heading="No files were found for this search."
          message="Please try again."
        />
      )}
    </MainContainer>
  );
}
export default AllFilesPage;
