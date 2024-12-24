"use client";

import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { CircleXIcon, TriangleAlert } from 'lucide-react';
import { getAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Category } from "../../page";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateCategory } from "./editCategory";




export default function EditCategoryForm({ category }: { category: Category }) {
    const router = useRouter();
    const [error, formAction] = useFormState(editCategory, null);
    const [deleteError, deleteFormAction] = useFormState(handleDelete, null);

    async function editCategory(state: any, formData: FormData) {
        const token = await getAuthToken();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        const categoryToUpdate = {
            name,
            description
        };
        const res = await updateCategory(category._id, categoryToUpdate);
        if (res.success) {
            router.push('/categories');
        } else {
            return res.error;
        }
    }

    async function handleDelete() {
        const token = await getAuthToken();
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/category/${category._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                return data.error;
            }
            router.push('/categories');
            router.refresh();
        } catch (error) {
            return error;
        }
    }



    if (!category) {
        return <p>Loading...</p>;
    }

    return (<div>
        <form action={formAction} id="editCategory">
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
                        form="editCategory"
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
                        form="editCategory"
                    />
                </div>
                <div className="flex gap-3 justify-end">
                    <SubmitButton />
                </div>
            </div>
        </form>
        <form action={deleteFormAction} className="flex justify-end" id="deleteCategory">
            <DeleteButton />
        </form>
        {
            error ? (
                <div className="flex justify-center">
                    <div role="alert" className="alert alert-error">
                        <CircleXIcon />
                        <span>{error}</span>
                    </div>
                </div>
            ) : <></>
        }
        {
            deleteError ? (
                <div className="flex justify-center">
                    <div role="alert" className="alert alert-error">
                        <CircleXIcon />
                        <span>{deleteError}</span>
                    </div>
                </div>
            ) : <></>
        }
    </div >)
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" disabled={pending} form="editCategory">
            {pending ? "Submitting" : "Edit Category"}
        </Button>
    )
}

function DeleteButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" disabled={pending}>
            {pending ? "Deleting" : "Delete Category"}
        </Button>
    )
}