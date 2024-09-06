import AllFilters from "./allFilters";
import ProductCard from "./cards";
import { Product, searchParamsProps } from "../../../types/allTypes";
import { fetchProducts } from "../../lib/data";
import Pagination from "./pagination";

export default async function Products({ searchParams }: searchParamsProps) {
  const query = new URLSearchParams(searchParams).toString();
  const products: Product[] = await fetchProducts(query)
  const currentPage = Number(searchParams?.page) || 1;
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);  

  return (<>
    <AllFilters products={products} />
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
      {currentProducts.map((product, index) => (
        <ProductCard
          key={index}
          imageUrl={product.imageUrl}
          brand={product.category}
          productName={product.name}
          price={product.price}
        />
      ))}
    </div>
    <div className="mt-5 flex w-full justify-center py-8">
      <Pagination totalPages={totalPages} />
    </div>
  </>

  )
}