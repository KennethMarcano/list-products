import { Suspense } from "react";

import Products from "./ui/product/products";
import { searchParamsProps } from "@/types/allTypes";
import { SkeletonProducts } from "./ui/skeletons";

export default async function Page({ searchParams }: searchParamsProps) {
  return (
    <main className="mx-auto max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl pt-10 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<SkeletonProducts/>}>
        <Products searchParams={searchParams}/>
      </Suspense>
    </main>
  );
}


