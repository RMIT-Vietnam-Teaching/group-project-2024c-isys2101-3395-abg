import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { formatCurrency } from '@/lib/utils';

export interface Product {
  _id: string;
  name: string;
  price: number;
  image_base64: string;
  description: string;
  brand: string;
  stock_quantity: number;
  compatible_vehicles: Array<{
    make: string;
    model: string;
    year: number;
  }>;
}


export default function ProductCard({ _id, name, price }: Product) {
  return (
    <div className="bg-brand-500 w-[330px] rounded-2xl shadow-xl">
      <Link href={`/products/${_id}`}>
        <Image
          className="rounded-t-lg"
          src="https://placehold.co/330x200/webP"
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
          <Button title="Add to Cart" link="/cart" />
        </div>
      </div>
    </div>
  );
}
