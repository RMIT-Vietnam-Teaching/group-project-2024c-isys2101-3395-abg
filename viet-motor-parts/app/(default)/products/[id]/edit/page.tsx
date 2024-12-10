import ProductEditForm from "./ProductEditForm";
import CompatibleVehicle from "@/app/components/CompatibleVehicle";
import CurrencyInputVietnam from "@/app/components/CurrencyInputVietnam";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/shadcn/select";
import { Textarea } from "@/app/components/shadcn/textarea";
import { fetchProductbyID } from "../fetchProductbyID";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await fetchProductbyID(params.id);

  return {
    title: `${res.name} Edit | Viet Motor Parts`,
    description: `Edit ${res.name} details`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await fetchProductbyID(params.id);

  return (
    <div className="container mx-auto flex flex-col justify-center gap-10">
      <h1 className="text-center text-5xl font-bold">Edit {product.name}</h1>
      <ProductEditForm product={product} />
    </div>
  );
}