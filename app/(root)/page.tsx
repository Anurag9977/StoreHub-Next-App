import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentFiles from "@/components/dashboard/RecentFiles";
import MainContainer from "@/components/globals/MainContainer";
import { getAllFiles } from "@/utils/actions";

async function DashboardPage() {
  const { documents, totalSize } = await getAllFiles({
    sort: "latest",
    search: "",
  });

  return (
    <MainContainer className="h-full py-8 grid lg:grid-cols-10 gap-y-6 gap-x-8">
      <section className="lg:col-span-5 flex flex-col gap-y-4">
        <DashboardChart totalSize={totalSize} />
        <DashboardStats />
      </section>
      <section className="hidden h-full lg:block lg:col-span-5">
        <RecentFiles documents={documents} />
      </section>
    </MainContainer>
  );
}
export default DashboardPage;
