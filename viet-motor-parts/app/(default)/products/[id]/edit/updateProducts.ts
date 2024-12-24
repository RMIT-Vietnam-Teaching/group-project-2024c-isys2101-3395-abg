'use server'
import { revalidatePath } from "next/cache";
import { Product } from "../../page";
import { getAuthToken } from "@/lib/auth";


export async function updateProduct(id: string, updates: Partial<Product>) {
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

        if (res.ok){
            revalidatePath("/products");
        }
        const data  = await res.json();
        return data;
      } catch (error) {
        return error;
      }
}

