import { Footer } from "@/app/components/Footer";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="grid grid-rows-3">
            <div className="flex items-center flex-col justify-center">
                <Link href="/">
                    <Image src="/logo/LogoWithName.png" alt="Viet Motor Parts Logo" width={200} height={200} className="mx-auto" />
                </Link>
            </div>
            <div className="mx-auto w-96 bg-brand-600 rounded-lg shadow-2xl">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                        Log in to Admin account
                    </h1>

                    <form id="loginForm" className="space-y-4 md:space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-white font-semibold">Username</Label>
                            <Input type="text"
                                name="username"
                                id="username"
                                placeholder="e.g LazadaAdmin"
                                required>
                            </Input>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white font-semibold">Password</Label>
                            <Input type="password"
                                name="password"
                                id="password"
                                placeholder="e.g r9mof6NlTd3AJ@3D"
                                required>
                            </Input>
                        </div>
                        <div>
                            <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl my-auto">
                                Log in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}