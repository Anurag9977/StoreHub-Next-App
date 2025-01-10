import { cn } from "@/lib/utils";

function MainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("px-8 lg:px-10 xl:px-12", className)}>{children}</main>
  );
}
export default MainContainer;
