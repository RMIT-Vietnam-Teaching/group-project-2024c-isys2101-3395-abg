import { Metadata } from "next/types";
import Hero from "@/app/components/Hero";
import Button from "@/app/components/Button";

export const metadata: Metadata = {
  title: "Homepage | Viet Motor Parts",
  description: "Homepage of Viet Motor Parts",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="grid w-screen grid-cols-1 gap-6 mx-auto my-5 lg:grid-cols-3 justify-items-center lg:gap-10 ">
        <div className="col-span-1 lg:col-start-2 ">
          <h1 className="text-6xl font-bold">
            Top Sellers
          </h1>
        </div>
        <div className="col-span-1 flex items-center">
          <Button title="View All" link="/products" />
        </div>
      </div>

    </div>
  );
}
