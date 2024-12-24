'use server'
import { getAuthToken } from "@/lib/auth";
import { Category } from "../page";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(category: Partial<Category>) {
    const token = await getAuthToken();
    try {
        const res = await fetch('http://localhost:3000/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });

        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
}

export async function addCategory(state: any, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const categoryToCreate = {
        name,
        description
    };
    const res = await createCategory(categoryToCreate);
    if (res.success) {
        revalidatePath("/categories");
        redirect("/categories");
    } else {
        return res.error;
    }
};