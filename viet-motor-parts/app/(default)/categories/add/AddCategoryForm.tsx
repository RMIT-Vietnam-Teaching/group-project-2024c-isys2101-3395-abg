"use client";

import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { addCategory} from "./createCategory";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useFormState, useFormStatus } from "react-dom";
import { CircleXIcon } from "lucide-react";

export default function AddCategoryForm() {
    const [error, formAction] = useFormState(addCategory, null);

    return (
        <form action={formAction}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                    <Label htmlFor="name" className="text-left lg:text-right font-bold">
                        Name
                    </Label>
                    <Input
                        id="name" name="name" type="text"
                        className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                        placeholder="e.g. Engine Parts"
                    />
                </div>
                <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
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
                    <SubmitButton />
                </div>
            </div>
            {error ? (
                <div className="flex justify-center">
                    <div role="alert" className="alert alert-error">
                        <CircleXIcon />
                        <span>{error}</span>
                    </div>
                </div>
            ) : <></>}
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" disabled={pending}>
            {pending ? "Submitting" : "Add Category"}
        </Button>
    )
}