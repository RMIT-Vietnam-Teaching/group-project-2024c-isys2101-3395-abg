import { Product } from "../page";
import { getAuthToken } from "@/lib/auth";


export async function updateProducts(id: string, updates: Partial<Product>): Promise<Product> {
    try {
        const token = await getAuthToken();
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Add the admin token
            },
            body: JSON.stringify(updates),
        });

        if (!res.ok) {
            console.error(`Failed to update product with ID: ${id}, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error(`Error updating product with ID: ${id}`, error);
        throw error;
    }
}