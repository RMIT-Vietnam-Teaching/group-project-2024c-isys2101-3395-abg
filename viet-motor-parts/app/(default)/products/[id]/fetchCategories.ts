import { Category } from "@/app/components/SideFilter";

export async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`http://localhost:3000/api/category`, { cache: "no-store" });
        if (!res.ok) {
            console.error(`Failed to fetch categories, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}
