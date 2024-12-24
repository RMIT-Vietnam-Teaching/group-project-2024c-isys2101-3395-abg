'use server'

import { revalidatePath } from "next/cache";
import { Product } from "../page";
import { getAuthToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createProducts(newProduct: Partial<Product>) {
  try {
    const token = await getAuthToken();
    const res = await fetch(`http://localhost:3000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Add the admin token
      },
      body: JSON.stringify(newProduct),
    });

    const data  = await res.json();

    return data;
  } catch (error) {
    return error;
  }
}
export async function addProduct(state: any, formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const stock_quantity = formData.get("stock_quantity") as string;
  const category_id = formData.get("category_id") as string;
  const image_base64 = formData.get("image") as string;
  const compatible_vehicles = formData.get("compatibleVehicles") as string;


  const product = {
      name,
      brand,
      description,
      price: parseInt(price),
      stock_quantity: parseInt(stock_quantity),
      category_id,
      image_base64,
      compatible_vehicles: JSON.parse(compatible_vehicles),
  }

  const res = await createProducts(product);
  if (res.success) {
      revalidatePath("/products");
      redirect(`/products/${res.data._id}`);
  } else {
      return res.error;
  }

};