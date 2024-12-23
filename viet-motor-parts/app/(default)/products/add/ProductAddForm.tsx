"use client";

import { useState, useEffect } from "react";
import CompatibleVehicle from "@/app/components/CompatibleVehicle";
import CurrencyInputVietnam from "@/app/components/CurrencyInputVietnam";
import ImageInput from "@/app/components/ImageInput";
import { Button } from "@/app/components/shadcn/button";
import { Textarea } from "@/app/components/shadcn/textarea";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { createProducts } from "./createProducts";
import { Category } from "@/app/(default)/categories/page";
import { Vehicle } from "@/app/(default)/vehicles/fetchVehicles";

type ProductAddFormProps = {
  compatibleVehicles: Vehicle[];
  categories: Category[];
};

export default function ProductAddForm({
  compatibleVehicles,
  categories,
}: ProductAddFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    category_id: "",
    image_base64: "",
    compatible_vehicles: [] as string[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceChange = (value: number) => {
    setFormData({ ...formData, price: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category_id: e.target.value });
  };

  const handleImageChange = (base64: string) => {
    setFormData((prev) => ({ ...prev, image_base64: base64 }));
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newProduct = await createProducts(formData);
      alert("Product added successfully!");
      window.location.href = `/products/${newProduct._id}`;
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSaveChanges} className="space-y-4">
      <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
        <Label htmlFor="name" className="text-left font-bold lg:text-right">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          className="col-span-3 bg-white text-black"
          value={formData.name}
          onChange={handleInputChange}
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
          value={formData.brand}
          onChange={handleInputChange}
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
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid-row-2 grid items-center gap-2 lg:grid-cols-4 lg:gap-4">
        <Label htmlFor="price" className="text-left font-bold lg:text-right">
          Price (VNĐ)
        </Label>
        <CurrencyInputVietnam
          defaultValue={formData.price}
          onChange={handlePriceChange}
          name="price"
        />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-4">
        <Label htmlFor="image" className="text-left font-bold lg:text-right">
          Image
        </Label>
        <ImageInput
          defaultBase64={formData.image_base64}
          onImageChange={handleImageChange}
        />
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
          value={formData.stock_quantity}
          onChange={handleInputChange}
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
          value={formData.category_id}
          onChange={handleCategoryChange}
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
        <CompatibleVehicle
          vehicles={compatibleVehicles}
          onSelect={(selectedVehicles) =>
            setFormData((prev) => ({
              ...prev,
              compatible_vehicles: selectedVehicles,
            }))
          }
        />
      </div>
      <div className="flex justify-end">
        <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">
          Add Product
        </Button>
      </div>
    </form>
  );
}
