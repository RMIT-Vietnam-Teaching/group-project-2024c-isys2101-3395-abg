import { ProductList } from '../components/ProductList';
import { Metadata } from "next/types";
import { Button } from '../components/shadcn/button';
import { SideFilter } from '../components/SideFilter';

export const metadata: Metadata = {
    title: "Products | Viet Motor Parts",
    description: "All Products of Viet Motor Parts",
};

export default function Page() {
    return (
        <div>
            <div className='grid grid-cols-3'>
                <div className='col-span-1'>
                    <SideFilter/>
                </div>
                <div className='col-span-2'>
                    <ProductList className="py-5" />
                </div>
            </div>
            <div className='grid grid-cols-3 py-3'>
                <div className='col-start-2 mx-auto'><Button> Pagination Placeholder</Button></div>
            </div>
        </div>

    );
}