"use client";

import { useState, useEffect } from "react";
import CompatibleVehicle from "@/app/components/CompatibleVehicle";
import CurrencyInputVietnam from "@/app/components/CurrencyInputVietnam";
import ImageInput from "@/app/components/ImageInput";
import { Button } from "@/app/components/shadcn/button";
import { Textarea } from "@/app/components/shadcn/textarea";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { updateProducts } from "../updateProducts";
import { Product } from "../../page";
import { Category } from "@/app/(default)/categories/page";
import { fetchCategories } from "@/app/(default)/categories/fetchCategories";

type ProductEditFormProps = {
  product: Product;
};

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    stock_quantity: product.stock_quantity,
    category_id: product.category_id,
    image_base64: product.image_base64,
    compatible_vehicles: product.compatible_vehicles || [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const updatedProduct = await updateProducts(product._id, formData);
      alert("Product updated successfully!");
      window.location.href = `/products/${product._id}`;
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategoryData();
  }, []);

  return (
    <form onSubmit={handleSaveChanges} className="space-y-4">
      <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
        <Label htmlFor="name" className="text-left lg:text-right font-bold">
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
      <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
        <Label htmlFor="brand" className="text-left lg:text-right font-bold">
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
      <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
        <Label htmlFor="description" className="text-left lg:text-right font-bold">
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
      <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
        <Label htmlFor="price" className="text-left lg:text-right font-bold">
          Price (VNĐ)
        </Label>
        <CurrencyInputVietnam
          defaultValue={formData.price}
          onChange={handlePriceChange}
          name="price"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
          <Label htmlFor="image" className="text-left lg:text-right font-bold">
            Image
          </Label>
          <ImageInput defaultBase64={formData.image_base64} onImageChange={handleImageChange} />
        </div>

      
      <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
        <Label htmlFor="quantity" className="text-left lg:text-right font-bold">
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
      <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
        <Label htmlFor="category_id" className="text-left lg:text-right font-bold">
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
      <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
        <Label htmlFor="compatibleVehicles" className="text-left lg:text-right font-bold">
          Compatible Vehicles
        </Label>
        <CompatibleVehicle/>
      </div>
      <div className="flex justify-end">
        <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
