import ProductCard from '@/app/components/ProductCard';
import { SideFilter } from '@/app/components/SideFilter';
import { Metadata } from "next/types";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/app/components/shadcn/pagination';
import { fetchCategories } from '../categories/fetchCategories';
import CustomPagination from '@/app/components/CustomPagination';
import { getAuthStatus } from '@/lib/auth';
import Button from '@/app/components/Button';

export interface Product {
    _id: string;
    name: string;
    price: number;
    image_base64: string;
    description: string;
    brand: string;
    stock_quantity: number;
    category_id: string;
    compatible_vehicles: string[];
}

export const metadata: Metadata = {
    title: "Products | Viet Motor Parts",
    description: "All Products of Viet Motor Parts",
};




export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
    const isLoggedIn = await getAuthStatus();
    let page = parseInt(searchParams.page, 10) || 1;
    page = !page || page < 1 ? 1 : page;
    let query = searchParams.query || "";
    let category = searchParams.category || "";
    let sortBy = searchParams.sortBy || "";
    let order = searchParams.order || "";
    let priceFrom = searchParams.priceFrom || "";
    let priceTo = searchParams.priceTo || "";

    // Construct API URL dynamically
    let apiUrl = `http://localhost:3000/api/products?page=${page}`;
    if (query) {
        apiUrl += `&query=${encodeURIComponent(query)}`;
    }
    if (category) {
        apiUrl += `&category=${encodeURIComponent(category)}`;
    }
    if (sortBy) {
        apiUrl += `&sortBy=${encodeURIComponent(sortBy)}`;
    }
    if (order) {
        apiUrl += `&order=${encodeURIComponent(order)}`;
    }
    if (priceFrom) {
        apiUrl += `&priceFrom=${encodeURIComponent(priceFrom)}`;
    }
    if (priceTo) {
        apiUrl += `&priceTo=${encodeURIComponent(priceTo)}`;
    }

    const res = await fetch(apiUrl);
    const data = await res.json();
    const products: Product[] = data.data;
    const categories = await fetchCategories();

    const totalPages = data.meta.totalPages;
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const pageNumbers: Number[] = [];
    const offsetNumber = 3;
    for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
        if (i > 0 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }



    return (
        <div className='flex flex-col'>
            {isLoggedIn ?
                <div className='grid md:grid-cols-3 justify-center items-center px-7'>
                    <div className="lg:col-start-3 flex justify-end items-center">
                        <Button link="/products/add" className="bg-palette-1 text-white" title='Add Product'></Button>
                    </div>
                </div>
                : <></>
            }
            <section className="flex flex-col w-full gap-10 pb-10 my-5 lg:flex-row px-7">
                <aside
                    className="left-0 w-full rounded-lg bg-palette-3 md:max-lg:block lg:block lg:sticky top-10 h-5/6 lg:w-1/4 md:max-lg:center-and-half">
                    <SideFilter categories={categories} />
                </aside>
                <div className="flex flex-col justify-between w-full xl:w-3/4">
                    <section
                        className="grid justify-center grid-cols-1 gap-3 mb-5 md:grid-cols-2 min-[1440px]:grid-cols-3 justify-items-center md:max-w-2xl lg:max-w-full lg:mx-0">
                        {products.map((product: Product) => (
                            <ProductCard key={product._id} _id={product._id} name={product.name} price={product.price} image_base64={product.image_base64 || ""} description={product.description} brand={product.brand} compatible_vehicles={product.compatible_vehicles} stock_quantity={product.stock_quantity} category_id={product.category_id} />
                        ))}
                    </section>
                    <div>
                        <CustomPagination page={page} totalPages={totalPages} pageNumbers={pageNumbers} prevPage={prevPage} nextPage={nextPage} />
                    </div>
                </div>
            </section>
        </div>
    );
}