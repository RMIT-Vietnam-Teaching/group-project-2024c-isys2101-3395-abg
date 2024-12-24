"use client";

import CompatibleVehicle from "@/app/components/CompatibleVehicle";
import CurrencyInputVietnam from "@/app/components/CurrencyInputVietnam";
import { Button } from "@/app/components/shadcn/button";
import { Textarea } from "@/app/components/shadcn/textarea";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Product } from "../../page";
import { Category } from "@/app/(default)/categories/page";
import { getProductImage } from "@/lib/utils";
import { useFormState, useFormStatus } from "react-dom";
import ClientImageInput from "@/app/components/ImageInput";
import { CircleXIcon } from "lucide-react";
import { Vehicle } from "@/app/(default)/vehicles/fetchVehicles";
import { updateProduct } from "./updateProducts";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

type ProductEditFormProps = {
  product: Product;
  compatibleVehicles?: Vehicle[];
  categories: Category[];
};

export default function ProductEditForm({ product, compatibleVehicles, categories }: ProductEditFormProps) {
  const router = useRouter();
  const [error, formAction] = useFormState(editProduct, null); // Hook to display error message

  async function editProduct(state: any, formData: FormData) {
    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const stock_quantity = formData.get("stock_quantity") as string;
    const category_id = formData.get("category_id") as string;
    const image_base64 = formData.get("image") as string;
    const compatible_vehicles = formData.get("compatibleVehicles") as string;

    const productToUpdate: Partial<Product> = {
      name,
      brand,
      description,
      price: parseInt(price),
      stock_quantity: parseInt(stock_quantity),
      category_id,
      image_base64,
      compatible_vehicles: JSON.parse(compatible_vehicles),
    };
    const res = await updateProduct(product._id, productToUpdate);
    if (res.success) {
      revalidatePath("/products");
      router.push(`/products/${res.data._id}`);
    } else {
      return res.error;
    }
  }


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
          defaultValue={product.name}
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
          defaultValue={product.brand}
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
          defaultValue={product.description}
        />
      </div>
      <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
        <Label htmlFor="price" className="text-left font-bold lg:text-right">
          Price (VNĐ)
        </Label>
        <CurrencyInputVietnam
          name="price"
          defaultValue={product.price}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-4">
        <Label htmlFor="image" className="text-left font-bold lg:text-right">
          Image
        </Label>
        <ClientImageInput name="image" defaultValue={getProductImage(product.image_base64)} />
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
          required
          defaultValue={product.stock_quantity}
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
          defaultValue={product.category_id}
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
        <CompatibleVehicle vehicles={compatibleVehicles} />
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
      {error ? (
        <div className="flex justify-center">
          <div role="alert" className="alert alert-error">
            <CircleXIcon />
            <span>{error}</span>
          </div>
        </div>
      ) : null}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" disabled={pending}>
      {pending ? "Submitting" : "Edit Product"}
    </Button>
  );
}
