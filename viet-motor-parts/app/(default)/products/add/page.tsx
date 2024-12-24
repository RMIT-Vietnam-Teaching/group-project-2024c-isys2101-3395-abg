import { fetchCategories } from "@/app/(default)/categories/fetchCategories";
import { Label } from "@/app/components/shadcn/label";
import { Input } from "@/app/components/shadcn/input";
import { Textarea } from "@/app/components/shadcn/textarea";
import CurrencyInputVietnam from "@/app/components/CurrencyInputVietnam";
import ImageInput from "@/app/components/ImageInput";
import CompatibleVehicle from "@/app/components/CompatibleVehicle";
import { Button } from "@/app/components/shadcn/button";
import { createProducts } from "./createProducts";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AddProductForm from "./form";

export async function generateMetadata() {
    return {
        title: `Add Product | Viet Motor Parts`,
        description: `Add a new product to the catalog`,
    };
}

export default async function Page() {
    const categories = await fetchCategories();




    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Add Product</h1>
            <AddProductForm categories={categories} />
        </div>
    );
}
