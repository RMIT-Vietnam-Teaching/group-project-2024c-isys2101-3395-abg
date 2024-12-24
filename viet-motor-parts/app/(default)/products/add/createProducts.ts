import { Product } from "../page";
import { getAuthToken } from "@/lib/auth";

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