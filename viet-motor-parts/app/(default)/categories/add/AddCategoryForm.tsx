"use client";

import { useState } from "react";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { createCategory } from "../createCategory";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth";

export default function AddCategoryForm() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const token = await getAuthToken();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        if (!token) {
            setError("No token found. Please log in.");
            return;
        }

        try {
            const newCategory = await createCategory(name, description, token);
            setSuccess('Category created successfully!');
            setError('');
            console.log('Category created:', newCategory);
            router.push("/categories");
            router.refresh();
        } catch (error) {
            setError('Failed to create category.');
            setSuccess('');
            console.error('Failed to create category:', error);
        }
    };

    return (
    <form action={handleSubmit}>
        <div className="grid gap-4 py-4">
            <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                <Label htmlFor="name" className="text-left lg:text-right font-bold">
                    Name
                </Label>
                <Input
                    id="name" name="name" type="text"
                    className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                    placeholder="e.g. Engine Parts "
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
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Add Category</Button>
            </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </form>
    );
}