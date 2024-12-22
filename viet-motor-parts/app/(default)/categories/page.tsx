import Button from "@/app/components/Button";
import { Metadata } from "next";
import { fetchCategories } from "./fetchCategories";

export type Category = {
    _id: string;
    name: string;
    description: string;
}

export const metadata: Metadata = {
    title: "Categories | Viet Motor Parts",
    description: "Manage your categories",
}


export default async function Page() {
    const categories: Category[] = await fetchCategories();

    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-0">
                <h1 className="text-center text-5xl font-bold lg:col-start-2">Categories</h1>
                <div className="lg:col-start-3 flex justify-center items-center">
                    <Button title="Add Category" link="/categories/add" />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div key={category._id} className="bg-brand-500 p-4 rounded-md shadow-md flex justify-between">
                        <div>
                            <h2 className="text-xl font-bold">{category.name}</h2>
                            <p>{category.description}</p>
                        </div>
                        <div className="flex items-center">
                            <Button title="Edit" link={`/categories/${category._id}/edit`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}