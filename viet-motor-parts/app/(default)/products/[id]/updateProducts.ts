import { Product } from "@/app/components/ProductCard";

export async function updateProducts(id: string, updates: Partial<Product>): Promise<Product> {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTU3YjAwN2M3ODBhODM0NzM0ODRhOSIsInVzZXJuYW1lIjoiYWRtaW5Vc2VyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzNjcxODg0LCJleHAiOjE3NjUyMDc4ODR9.-45HxCGZsu07FVYdq1NLvQCdAcd25ee3H5Nr2uonlUw`, // Add the admin token
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