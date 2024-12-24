'use server'

import { getAuthToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Category } from "../../page";





export async function updateCategory(id: string, updates: Partial<Category>) {
    try {
        const token = await getAuthToken();
        const res = await fetch(`http://localhost:3000/api/category/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Add the admin token
            },
            body: JSON.stringify(updates),
        });

        if (res.ok){
            revalidatePath("/categories");
        }
        const data  = await res.json();
        return data;
      } catch (error) {
        return error;
      }
}






