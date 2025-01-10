import { Layers } from "lucide-react";
import authImage from "@/assets/authImage.svg";
import Image from "next/image";
import { getCurrentUser } from "@/utils/actions";
import { redirect } from "next/navigation";
import { chillax } from "@/utils/fonts";

export const dynamic = "force-dynamic";

async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();
  if (user.payload) {
    return redirect("/");
  }

  return (
    <main className="h-dvh grid lg:grid-cols-10">
      <section className="hidden col-span-4 h-full bg-primary lg:flex flex-col text-background p-16">
        <div className="flex items-center gap-4">
          <Layers className="w-10 h-10 xl:w-11 xl:h-11" />
          <h1
            className={`${chillax.className} text-3xl xl:text-4xl font-bold tracking-wide`}
          >
            StoreHub
          </h1>
        </div>
        <h2 className="text-xl xl:text-2xl font-semibold mt-10 xl:mt-12 tracking-wide">
          Manage your files the best way
        </h2>
        <p className="mt-4 xl:mt-6 leading-loose xl:leading-relaxed text-sm xl:text-base text-justify font-semibold">
          Secure and seamless file storage and sharing app that enables users to
          upload, organize, and share files effortlessly, ensuring accessibility
          and collaboration from any device.
        </p>
        <Image
          src={authImage}
          height={256}
          width={256}
          priority
          alt="auth-image"
          className="h-56 xl:h-64 w-full object-contain mt-12"
        />
      </section>
      <section className="lg:col-span-6 flex justify-center items-center">
        {children}
      </section>
    </main>
  );
}
export default AuthLayout;
