export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;
}

export interface searchParamsProps {
  searchParams?: {
    name?: string;
    category?: string;
    brand?: string;
    page?: string;
  }
}

export interface ContentFilter {
  [key: string]: string[]
}