import { Metadata } from "next";
import EditCategoryForm from "./EditCategoryForm";
import { fetchCategorybyID } from "./fetchCategorybyID";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const res = await fetchCategorybyID(params.id);

    return {
        title: `Edit ${res.name} | Viet Motor Parts`,
        description: `Edit ${res.name} details`,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const category = await fetchCategorybyID(params.id);

    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Edit {category.name}</h1>
            <EditCategoryForm category={category}/>
        </div>
    );
}
