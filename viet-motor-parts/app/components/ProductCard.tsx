import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency, getProductImage } from '@/lib/utils';
import AddToCart from './addToCart';
import { Product } from '../(default)/products/page';
import { getAuthStatus } from '@/lib/auth';
import Button from './Button';


export default async function ProductCard({ _id, name, price, image_base64 }: Product) {
  const isLoggedIn = await getAuthStatus();

  return (
    <div className="bg-brand-500 rounded-2xl shadow-xl">
      <Link href={`/products/${_id}`}>
        <Image
          className="rounded-t-lg w-[330px] h-[300px]"
          src={getProductImage(image_base64)}
          alt="product image"
          width={330}
          height={300}
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
          {isLoggedIn ? (
            <Button
              link={`/products/${_id}/edit`}
              title="Edit"
            />
          ) : (<AddToCart
            id={_id}
            name={name}
            price={price}
            image_base64={image_base64}
            amount={1}
          />
          )}
        </div>
      </div>
    </div>
  );
}
