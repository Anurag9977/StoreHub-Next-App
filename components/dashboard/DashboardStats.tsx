import { getFileStatsByType } from "@/utils/actions";
import StatsCard from "./StatsCard";

async function DashboardStats() {
  const fileStats = await getFileStatsByType();
  return (
    <section className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
      {fileStats.map((stats, index) => (
        <StatsCard key={index} stats={stats} />
      ))}
    </section>
  );
}
export default DashboardStats;
