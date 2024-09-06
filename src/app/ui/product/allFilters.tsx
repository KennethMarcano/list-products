import InformationSearch from "../informationSearch";
import Search from "../search";
import Filter from "./filter";
import { Product, ContentFilter } from "@/types/allTypes";

interface Props {
    products: Product[];
}

const infoFilter: ContentFilter =
{
    tenis: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Asics', 'Saucony'],
    smartphone: ['Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'Google', 'LG'],
    camisetas: ['H&M', "Levi's", 'Fruit of the Loom', 'Vans', 'Billabong'],
    calças: ['Wrangler', 'Dockers', 'H&M', 'Lee'],
    notebooks: ['Dell', 'HP', 'Asus', 'Lenovo', 'Microsoft', 'Razer', 'Acer'],
}

export default function AllFilters({ products }: Props) {
    return (
        <>
            <div className="flex flex-wrap gap-5">
                <Search placeholder="Buscar produto" />
                <div className="flex gap-5">
                    <Filter typeFilter="category" infoFilter={infoFilter} />
                    <Filter typeFilter="brand" infoFilter={infoFilter} />
                </div>
            </div>

            <InformationSearch totalProducts={products.length} />
        </>
    )
}