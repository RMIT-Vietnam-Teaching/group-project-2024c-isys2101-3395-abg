import CompatibleVehicle from "@/app/components/CompatibleVehicle";
import CurrencyInputVietnam from "@/app/components/CurrencyInputVietnam";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/shadcn/select";
import { Textarea } from "@/app/components/shadcn/textarea";
import { fetchProducts } from "../fetchProducts";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: { id: string } }) {
    const res = await fetchProducts(params.id);

    return {
        title: `${res.name} Edit | Viet Motor Parts`,
        description: `Edit ${res.name} details`,
    };
}



export default async function Page({ params }: { params: { id: string } }) {
    const product = await fetchProducts(params.id);
    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">{product.name}</h1>
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
                            defaultValue={product.name}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <label htmlFor="brand" className="text-left lg:text-right font-bold">
                            Brand
                        </label>
                        <input
                            id="brand" name="brand" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            defaultValue={product.brand}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="description" className="text-left lg:text-right font-bold">
                            Description
                        </Label>
                        <Textarea id="description" name="description" className="col-span-3 bg-white text-black" defaultValue={product.description} />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="price" className="text-left lg:text-right font-bold">
                            Price (VNĐ)
                        </Label>
                        <CurrencyInputVietnam defaultValue={product.price} />
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
                        <Input id="quantity" type="number" name="quantity" min="0" className="col-span-3 bg-white text-black" defaultValue={product.stock_quantity} />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="category_id" className="text-left lg:text-right font-bold">
                            Category
                        </Label>
                        <select className="select col-span-3 bg-white text-black" name="category_id" id="category_id">
                            <option value={product.category_id}>{product.category_id}</option>
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
                        <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Save Changes</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}