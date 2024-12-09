import { fetchProducts } from "../fetchProducts";
import ProductEditForm from "./ProductEditForm";
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
      <h1 className="text-center text-5xl font-bold">Edit {product.name}</h1>
      <ProductEditForm product={product} />
    </div>
  );
}