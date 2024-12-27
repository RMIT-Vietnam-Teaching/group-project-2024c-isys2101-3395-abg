import { fetchCategories } from "@/app/(default)/categories/fetchCategories";
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
