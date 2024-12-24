'use client'

import { revalidatePath } from "next/cache";
import { addProduct, createProducts } from "./createProducts";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "@/app/components/shadcn/label";
import { Input } from "@/app/components/shadcn/input";
import { Textarea } from "@/app/components/shadcn/textarea";
import CurrencyInputVietnam from "@/app/components/CurrencyInputVietnam";
import ClientImageInput from "@/app/components/ImageInput";
import { Category } from "../../categories/page";
import CompatibleVehicle from "@/app/components/CompatibleVehicle";
import { Button } from "@/app/components/shadcn/button";
import { CircleXIcon } from "lucide-react";

interface AddProductFormProps {
    categories: Category[];
}

export default function AddProductForm({ categories }: AddProductFormProps) {
    const [error, formAction] = useFormState(addProduct, null); // Hook to display error message
    const router = useRouter();
    let imageBase64 = "";


    return (
        <form action={formAction} className="space-y-4">
            <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
                <Label htmlFor="name" className="text-left font-bold lg:text-right">
                    Name
                </Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    className="col-span-3 bg-white text-black"
                    required
                    minLength={3}
                />
            </div>
            <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
                <Label htmlFor="brand" className="text-left font-bold lg:text-right">
                    Brand
                </Label>
                <Input
                    id="brand"
                    name="brand"
                    type="text"
                    className="col-span-3 bg-white text-black"
                    required
                />
            </div>
            <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
                <Label
                    htmlFor="description"
                    className="text-left font-bold lg:text-right"
                >
                    Description
                </Label>
                <Textarea
                    id="description"
                    name="description"
                    className="col-span-3 bg-white text-black"
                    required
                    minLength={10}
                />
            </div>
            <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
                <Label htmlFor="price" className="text-left font-bold lg:text-right">
                    Price (VNĐ)
                </Label>
                <CurrencyInputVietnam
                    name="price"
                />
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-4">
                <Label htmlFor="image" className="text-left font-bold lg:text-right">
                    Image
                </Label>
                <ClientImageInput name="image" />
            </div>
            <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
                <Label htmlFor="quantity" className="text-left font-bold lg:text-right">
                    Stock Quantity
                </Label>
                <Input
                    id="quantity"
                    name="stock_quantity"
                    type="number"
                    min="0"
                    className="col-span-3 bg-white text-black"
                />
            </div>
            <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
                <Label
                    htmlFor="category_id"
                    className="text-left font-bold lg:text-right"
                >
                    Category
                </Label>
                <select
                    className="select col-span-3 bg-white text-black"
                    name="category_id"
                    id="category_id"
                >
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
                <Label
                    htmlFor="compatibleVehicles"
                    className="text-left font-bold lg:text-right"
                >
                    Compatible Vehicles
                </Label>
                <CompatibleVehicle />
            </div>
            <div className="flex justify-end">
                <SubmitButton />
            </div>
            {error && (
                <div className="flex justify-center">
                    <div role="alert" className="alert alert-error">
                        <CircleXIcon />
                        <span>{error}</span>
                    </div>
                </div>
            )}
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" disabled={pending}>
            {pending ? "Submitting" : "Add Product"}
        </Button>
    );
}