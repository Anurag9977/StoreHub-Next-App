import MainContainer from "@/components/globals/MainContainer";
import MobileNavigation from "@/components/mobile-navigation/MobileNavigation";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { getCurrentUser } from "@/utils/actions";
import { redirect } from "next/navigation";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();
  if (!user.payload) {
    return redirect("/login");
  }

  return (
    <MainContainer className="grid lg:grid-cols-10 lg:gap-x-6 xl:gap-x-8">
      {/* Mobile Navigation */}
      <section className="lg:hidden">
        <MobileNavigation {...user.payload} />
        <div className="bg-muted rounded-xl mt-4 mb-8">{children}</div>
      </section>
      {/* Sidebar */}
      <section className="hidden pb-8 lg:block lg:col-span-2 min-h-dvh h-full">
        <Sidebar />
      </section>
      {/* Navbar and Dynamic content */}
      <section className="hidden pb-8 lg:block lg:col-span-8">
        <Navbar {...user.payload} />
        <div className="bg-muted h-[calc(100%-6rem)] rounded-xl">
          {children}
        </div>
      </section>
    </MainContainer>
  );
}
export default layout;
