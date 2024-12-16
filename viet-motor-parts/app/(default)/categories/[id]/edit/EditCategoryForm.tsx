"use client"; //localStorage can only be access using client components?

import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { fetchCategorybyID } from "./fetchCategorybyID";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCategoryForm({ params }: { params: { id: string } }) { // async is not allowed for client components    
    const [category, setCategory] = useState<{ name: string; description: string } | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        async function fetchCategory() {
            try {
                const data = await fetchCategorybyID(params.id);
                setCategory(data);
            } catch (error) {
                console.error('Failed to fetch category:', error);
            }
        }
        fetchCategory();
    }, [params.id]);

    async function handleSubmit(formData: FormData) {

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/category/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name, description })
            });

            if (!res.ok) {
                console.error(`Failed to update category, Status: ${res.status}`);
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Category updated:', data.data);
            router.push("/categories");
            router.refresh(); // To update the categories info properly
            // Handle success
        } catch (error) {
            console.error('Failed to update category:', error);
            // Handle error
        }
    }

    async function handleDelete() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/category/${params.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                console.error(`Failed to delete category, Status: ${res.status}`);
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Category deleted:', data.data);

            // Navigate back to the vehicles page and reload
            router.push("/categories");
            router.refresh(); // This will reload the page to ensure updated data is displayed
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    }

    if (!category) {
        return <p>Loading...</p>;
    }

    return (<form action={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <Label htmlFor="name" className="text-left lg:text-right font-bold">
                            Name
                        </Label>
                        <Input
                            id="name" name="name" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. Engine Parts"
                            defaultValue={category.name}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <Label htmlFor="description" className="text-left lg:text-right font-bold">
                            Description
                        </Label>
                        <Input
                            id="description" name="description" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. Parts and accessories for engines."
                            defaultValue={category.description}
                        />
                    </div>
                    <div className="flex gap-3 justify-end">
                        <Button type="button" onClick={handleDelete} className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Delete Category</Button>
                        <Button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Edit Category</Button>
                    </div>
                </div>
            </form>)
}