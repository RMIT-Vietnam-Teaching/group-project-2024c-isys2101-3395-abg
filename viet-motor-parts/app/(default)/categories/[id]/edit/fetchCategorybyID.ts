import { Category } from "../../page";


export async function fetchCategorybyID(id: string): Promise<Category> {
    try {
        const res = await fetch(`http://localhost:3000/api/category/${id}` , { cache: "no-store" });
        if (!res.ok) {
            console.error(`Failed to fetch category with ID: ${id}, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error(`Error fetching category with ID: ${id}`, error);
        throw error;
    }
}
