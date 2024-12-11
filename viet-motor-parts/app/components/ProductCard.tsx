
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency, getProductImage } from '@/lib/utils';
import AddToCart from './addToCart';
import { Product } from '../(default)/products/page';




const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductCard({ _id }: { _id: string }) {
  const { data, error } = useSWR(`/api/products/${_id}`, fetcher);

  if (error) return <div>Error loading product data.</div>;
  if (!data) return <div>Loading...</div>;

  const product: Product = data.data;

  return (
    <div className="bg-brand-500 w-[330px] rounded-2xl shadow-xl">
      <Link href={`/products/${product._id}`}>
        <Image
          className="rounded-t-lg"
          src={getProductImage(product.image_base64)}
          alt="product image"
          width={330}
          height={200}
        />
      </Link>
      <div className="flex flex-col justify-between gap-3 px-5 pt-3 pb-5">
        <Link href={`/products/${product._id}`}>
          <h5 className="text-xl font-semibold tracking-tight line-clamp-2" id="productName">
            {product.name}
          </h5>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" id="price">
            {formatCurrency(product.price)}
          </span>
          <AddToCart
            id={product._id}
            name={product.name}
            price={product.price}
            image_base64={product.image_base64}
            amount={1}
          />
        </div>
      </div>
    </div>
  );
}
