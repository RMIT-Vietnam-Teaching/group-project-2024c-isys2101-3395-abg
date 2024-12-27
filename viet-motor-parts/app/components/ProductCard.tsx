import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency, getProductImage } from '@/lib/utils';
import AddToCart from './addToCart';
import { Product } from '../(default)/products/page';
import { getAuthStatus } from '@/lib/auth';
import Button from './Button';


export default async function ProductCard({ _id, name, price, discount_perc, image_base64 }: Product) {
  const isLoggedIn = await getAuthStatus();

  return (
    <div className="bg-brand-500 rounded-2xl shadow-xl max-w-[330px] flex justify-between flex-col">
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
        {name.length > 30 ? (
          <Link href={`/products/${_id}`} className='tooltip tooltip-top [--tooltip-color:#A33757] [--tooltip-text-color:#FFFFFF]' data-tip={name}>
            <h5 className="text-xl font-semibold tracking-tight max-w-[330px] line-clamp-1 overflow-hidden text-left" id="productName">
              {name}
            </h5>
          </Link>
        ) : (
          <Link href={`/products/${_id}`}>
            <h5 className="text-xl font-semibold tracking-tight line-clamp-1 text-left" id="productName">
              {name}
            </h5>
          </Link>
        )}
        <div className="flex items-center justify-between">
          <div id='pricing' className='flex flex-col gap-2'>
            <span className="text-2xl font-bold" id="price">
              {formatCurrency(price)}
            </span>
            <div id='fake-price' className='flex gap-2 items-center'>
              <span className="text-xs font-semibold line-through" id="fake-og-price">
                {formatCurrency(price + price * (discount_perc / 100))}
              </span>
              <span className='text-sm font-bold bg-brand-600 p-1 rounded-lg'>
                -{discount_perc}%
              </span>
            </div>
          </div>
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
