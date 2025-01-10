"use client";

import MainContainer from "@/components/globals/MainContainer";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <MainContainer className="h-full py-8 grid lg:grid-cols-10 gap-y-6 gap-x-8">
      <section className="lg:col-span-5 flex flex-col gap-y-4">
        <Skeleton className="w-full h-60" />
        <div className="w-full h-60 mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
        </div>
      </section>
      <section className="hidden lg:block lg:col-span-5">
        <Skeleton className="w-full h-full " />
      </section>
    </MainContainer>
  );
}
export default loading;
