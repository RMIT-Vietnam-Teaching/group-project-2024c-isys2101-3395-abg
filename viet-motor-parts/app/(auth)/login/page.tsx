import Image from "next/image";
import Link from "next/link";
import LoginForm from "./loginform";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Viet Motor Parts",
};


export default function Page() {


    return (
        <div className="grid grid-rows-3">
            <div className="flex items-center flex-col justify-center">
                <Link href="/">
                    <Image
                        src="/logo/LogoWithName.png"
                        alt="Viet Motor Parts Logo"
                        width={200}
                        height={200}
                        className="mx-auto"
                    />
                </Link>
            </div>
            <div className="mx-auto w-96 bg-brand-600 rounded-lg shadow-2xl">
                <LoginForm />
            </div>
        </div>
    );
}
