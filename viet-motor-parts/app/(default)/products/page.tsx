import ProductCard from '@/app/components/ProductCard';
import { SideFilter } from '@/app/components/SideFilter';
import { Metadata } from "next/types";
import { Product } from '@/app/components/ProductCard';

export const metadata: Metadata = {
    title: "Products | Viet Motor Parts",
    description: "All Products of Viet Motor Parts",
};


export default async function Page() {
    const res = await fetch("http://localhost:3000/api/products", {
        cache: "no-store", // Avoid caching to ensure fresh data
    });
    const data = await res.json();
    const products: Product[] = data.data;
    return (
        <section className="flex flex-col w-full gap-10 pb-10 my-5 content lg:flex-row px-7">
            <aside
                className="left-0 w-full p-5 border rounded-lg bg-palette-3 md:max-lg:block lg:block lg:sticky top-10 h-5/6 lg:w-1/4 md:max-lg:center-and-half">
            </aside>
            <div className="flex flex-col justify-center w-full xl:w-3/4">
                <section
                    className="grid items-center justify-center grid-cols-1 gap-3 mb-5 md:grid-cols-2 min-[1440px]:grid-cols-3 justify-items-center md:max-w-2xl lg:max-w-full lg:mx-0">
                    {products.map((product: Product) => (
                        <ProductCard key={product._id} _id={product._id} name={product.name} price={product.price} image_base64={product.image_base64 || ""} description={product.description} brand={product.brand} compatible_vehicles={product.compatible_vehicles} stock_quantity={product.stock_quantity} />
                    ))}
                </section>
            </div>
        </section>

    );
}