import { twMerge } from "tailwind-merge";
import ProductCard from "./ProductCard";

interface ProductListProps {
  className?: string;
}


export function ProductList({ className }: ProductListProps) {
  return (
    <div className={twMerge(`grid items-center grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2 justify-items-center`, className)}>
      {[...Array(6)].map((_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  )
}