import { Product } from "@/app/components/ProductCard";

export async function fetchProducts(id: string): Promise<Product> {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await res.json();
    return data.data;
}