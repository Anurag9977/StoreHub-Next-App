import { redirect } from "next/navigation";

function HomePage() {
  return redirect("/dashboard");
}
export default HomePage;
