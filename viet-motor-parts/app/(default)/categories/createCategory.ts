import { Category } from "./page";

export async function createCategory(name: string, description: string, token: string) {
    console.log("Name: " + name)
    console.log("Des: " + description)
    console.log("Token: " + token)
    try {
        const res = await fetch('http://localhost:3000/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description })
        });

        if (!res.ok) {
            console.error(`Failed to create category, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}