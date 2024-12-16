import AddCategoryForm from "./AddCategoryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Category | Viet Motor Parts",
    description: "Add a new category to your shop",
};

export default function Page() {
    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Add Category</h1>
            <AddCategoryForm/>
        </div>
    );
}
