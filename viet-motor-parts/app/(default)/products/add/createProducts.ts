import { Product } from "../page";
import { getAuthToken } from "@/lib/auth";

export async function createProducts(newProduct: Partial<Product>): Promise<Product> {
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

    if (!res.ok) {
      console.error(`Failed to create product, Status: ${res.status}`);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}