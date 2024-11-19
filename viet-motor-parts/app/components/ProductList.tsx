import ProductCard  from "./ProductCard";
export function ProductList(){
    return (
        <div className="grid items-center grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2 justify-items-center">
        {[...Array(6)].map((_, index) => (
          <ProductCard key={index} />
        ))}
          </div>
    )
}