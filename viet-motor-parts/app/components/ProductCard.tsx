import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function productCard() {
  return (
    <div className="bg-brand-500 w-80 rounded-2xl shadow-2xl">
      <a href="#">
        <Image
          className="rounded-t-lg"
          src="https://placehold.co/350x200/webP"
          alt="product image"
          width={350}
          height={200}
        />
      </a>
      <div className="flex flex-col justify-between gap-3 px-5 pb-5 pt-3">
        <Link href="#">
          <h5 className="text-xl font-semibold tracking-tight" id="productName">
            MOTORBIKE 4T 5W30 MOLYGEN SCOOTER LIQUI MOLY
          </h5>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold" id="price">
            300.000đ
          </span>
          <Button title="Add to Cart" link="/cart" />
        </div>
      </div>
    </div>
  );
}
