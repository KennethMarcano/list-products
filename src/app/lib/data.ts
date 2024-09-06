import { Product, searchParamsProps } from "@/types/allTypes";

export async function fetchProducts(query:string) {
    const response = await fetch(`http://localhost:3000/api/products?${query}`);
    if (!response.ok) {
        throw new Error('Error al cargar los productos');
    }
    const data: Product[] = await response.json();
    return data;

};