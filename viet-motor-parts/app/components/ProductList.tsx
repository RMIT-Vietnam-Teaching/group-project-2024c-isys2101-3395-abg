import { twMerge } from "tailwind-merge";
import ProductCard from "./ProductCard";

interface ProductListProps {
  className?: string;
}
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  image_base64?: string;
  compatible_vehicles: Array<{
    make: string;
    model: string;
    year: number;
  }>;
}

export async function ProductList({ className }: ProductListProps): Promise<JSX.Element> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store", // Avoid caching to ensure fresh data
  });
  const data = await res.json();
  const products: Product[] = data.data;
  console.log("Products:", products);
  return (
    <div className={twMerge(`grid items-center grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2 justify-items-center`, className)}>
      {products.map((product: Product) => (
        <ProductCard key={product._id} id={product._id} name={product.name} price={product.price} image={product.image_base64 || ""} description={product.description} brand={product.brand} compatibleVehicles={product.compatible_vehicles} />
      ))}
    </div>
  )
}