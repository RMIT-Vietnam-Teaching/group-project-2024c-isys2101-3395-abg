import { ProductList } from '../components/ProductList';
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Products | Viet Motor Parts",
    description: "All Products of Viet Motor Parts",
};

export default function Page() {
    return (
        <div className='grid grid-cols-3'>
            <div className='col-span-1'>
                Sort and Filter
            </div>
            <div className='col-span-2'>
                <ProductList className="py-5" />
            </div>
        </div>
    );
}