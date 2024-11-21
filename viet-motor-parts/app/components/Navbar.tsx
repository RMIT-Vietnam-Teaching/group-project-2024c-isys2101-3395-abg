import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Menu, ShoppingCartIcon } from 'lucide-react';


export function Navbar() {
  return (
    <div className="navbar bg-brand-600 font-bold">
      <div className="w-7/12 justify-start">
        <details className="dropdown lg:hidden">
          <summary className="btn btn-ghost lg:hidden">
            <Menu size={32} />
          </summary>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 grid w-screen gap-2 rounded-box bg-brand-600 shadow"
          >
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              Tools
              <ul className="p-2">
                <li>
                  <Link href="/compatability-check">Compatability Check</Link>
                </li>
                <li>
                  <Link href="/calculator">Interest Rate Calculator</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/order-tracking">Order Tracking</Link>
            </li>
            <SearchBar />
          </ul>
        </details>
        <Link href="/">
          <Image
            src="/logo/LogoWithNameSide.png"
            alt="Viet Motor Parts logo"
            width={140}
            height={75}
          />
        </Link>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/products">Products</Link>

            </li>
            <li>
              <div className="dropdown dropdown-hover dropdown-bottom">
                <div tabIndex={0} role="button">Tools</div>
                <ul tabIndex={0} className="bg-brand-600 p-2 dropdown-content z-[1] w-52 rounded-lg">
                  <li>
                    <Link href="/compatability-check">Compatability Check</Link>
                  </li>
                  <li>
                    <Link href="/calculator">Interest Rate Calculator</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link href="/order-tracking">Order Tracking</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="w-[420px]">
          <SearchBar />
        </div>
      </div>
      <div className="navbar-end flex gap-5">
        <Link href='/cart'>
          <ShoppingCartIcon size={32} />
        </Link>
        <div className="tooltip tooltip-warning tooltip-bottom lg:mr-7" data-tip="Only for Admins!">
          <Link href="/login" className="rounded-3xl bg-brand-500 px-5 py-3">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
