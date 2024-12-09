"use client"

import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { formatCurrency, getProductImage } from '@/lib/utils';
import AddToCart from './addToCart';

export interface Product {
  _id: string;
  name: string;
  price: number;
  image_base64: string;
  description: string;
  brand: string;
  stock_quantity: number;
  category_id: string;
  compatible_vehicles: Array<{
    make: string;
    model: string;
    year: number;
  }>;
}


export default function ProductCard({ _id, name, price, image_base64 }: Product) {
  return (
    <div className="bg-brand-500 w-[330px] rounded-2xl shadow-xl">
      <Link href={`/products/${_id}`}>
        <Image
          className="rounded-t-lg"
          src={getProductImage(image_base64)}
          alt="product image"
          width={330}
          height={200}
        />
      </Link>
      <div className="flex flex-col justify-between gap-3 px-5 pt-3 pb-5">
        <Link href={`/products/${_id}`}>
          <h5 className="text-xl font-semibold tracking-tight line-clamp-2" id="productName">
            {name}
          </h5>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" id="price">
            {formatCurrency(price)}
          </span>
          <AddToCart id={_id} name={name} price={price} image_base64={image_base64} amount={1} />
        </div>
      </div>
    </div>
  );
}
