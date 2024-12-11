import CurrencyInputVietnam from "@/app/components/CurrencyInputVietnam";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Textarea } from "@/app/components/shadcn/textarea";
import { Button } from "@/app/components/shadcn/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/shadcn/select";
import { Metadata } from "next/types";
import CompatibleVehicle from "@/app/components/CompatibleVehicle";


export const metadata: Metadata = {
    title: "Add Product | Viet Motor Parts",
    description: "Add a new product to your shop",
};

export default function Page() {
    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Add Product</h1>
            <form action="">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <label htmlFor="name" className="text-left lg:text-right font-bold">
                            Name
                        </label>
                        <input
                            id="name" name="name" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. "
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <label htmlFor="brand" className="text-left lg:text-right font-bold">
                            Brand
                        </label>
                        <input
                            id="brand" name="brand" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="description" className="text-left lg:text-right font-bold">
                            Description
                        </Label>
                        <Textarea id="description" name="description" className="col-span-3 bg-white text-black" />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="price" className="text-left lg:text-right font-bold">
                            Price (VNĐ)
                        </Label>
                        <CurrencyInputVietnam name="price" />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="image" className="text-left lg:text-right font-bold">
                            Image
                        </Label>
                        <Input id="image" type="file" name="image" accept="image/*" className="col-span-3 bg-white text-black file:bg-white" multiple />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="quantity" className="text-left lg:text-right font-bold">
                            Stock Amount
                        </Label>
                        <Input id="quantity" type="number" name="quantity" min="0" className="col-span-3 bg-white text-black" />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="category_id" className="text-left lg:text-right font-bold">
                            Category
                        </Label>
                        <select className="select col-span-3 bg-white text-black" name="category_id" id="category_id">
                            <option disabled selected>Select a category</option>
                            <option value="homer">Homer</option>
                            <option>Marge</option>
                            <option>Bart</option>
                            <option>Lisa</option>
                            <option>Maggie</option>
                        </select>
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="compatibleVehicles" className="text-left lg:text-right font-bold">
                            Compatible Vehicles
                        </Label>
                        <CompatibleVehicle />
                    </div>
                    <div className="flex justify-end">
                        <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Add Product</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}