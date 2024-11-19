import { Metadata } from "next/types";
import Hero from "./components/Hero";
import { ProductList } from "./components/ProductList";
import Button from "./components/Button";

export const metadata: Metadata = {
  title: "Homepage | Viet Motor Parts",
  description: "Homepage of Viet Motor Parts",
};

export default function Home() {
  return (
    <div>
      <Hero/>
      <div className="justify-items-center items-center justify-center">
    <div className="text-center pb-10 grid grid-cols-3">
        <h1 className="text-5xl font-bold col-start-2">
            Top Sellers
        </h1>
        <Button title="View All" link="/products" className="w-min" />
    </div>
      <ProductList/>
      </div>
    </div>
  );
}
