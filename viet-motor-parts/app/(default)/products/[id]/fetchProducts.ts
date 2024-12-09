import { Product } from "@/app/components/ProductCard";

export async function fetchProducts(id: string): Promise<Product> {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, { next: { revalidate: 300 } });
        if (!res.ok) {
            console.error(`Failed to fetch product with ID: ${id}, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error(`Error fetching product with ID: ${id}`, error);
        throw error;
    }
}
