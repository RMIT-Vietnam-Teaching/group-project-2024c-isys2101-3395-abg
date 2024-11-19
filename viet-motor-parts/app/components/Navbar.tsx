import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

export function Navbar() {
  return (
    <div className="navbar bg-brand-600 font-bold">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 grid w-52 gap-3 rounded-box bg-brand-600 p-2 shadow"
          >
            <li>
              <a>Products</a>
            </li>
            <li>
              <a>Tools</a>
              <ul className="p-2">
                <li>
                  <a>Compatability</a>
                </li>
                <li>
                  <a>Interest Rate Calculator</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </div>
        <Link href="/">
          <Image
            src="/logo/LogoWithNameSide.png"
            alt="Viet Motor Parts logo"
            width={140}
            height={75}
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Products</a>
          </li>
          <li>
            <details>
              <summary>Tools</summary>
              <ul className="bg-brand-600 p-2">
                <li>
                  <a>Compatability Check</a>
                </li>
                <li>
                  <a>Interest Rate Calculator</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Orders</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end grid grid-cols-4">
        <div className="col-span-3">     
             <SearchBar />
        </div>
        <div className="col-span-1 justify-items-center grid tooltip tooltip-warning tooltip-bottom" data-tip="Only for Admins!">        
            <Link href="/login" className="rounded-3xl bg-brand-500 px-5 py-3">
              Login
            </Link>
        </div>
      </div>
    </div>
  );
}
