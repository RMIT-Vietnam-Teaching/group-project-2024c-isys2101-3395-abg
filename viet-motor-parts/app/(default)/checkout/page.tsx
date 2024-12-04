import OrderSummary from "@/app/components/OrderSummary";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Textarea } from "@/app/components/shadcn/textarea";
import VietnameseAddressInput from "@/app/components/VietnameseAddressInput";
import { Metadata } from "next/types";
import dynamic from "next/dynamic";
import PaymentMethod from "./paymentMethod";
import { calculateLoan } from "../calculator/page";
import { Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Checkout | Viet Motor Parts",
    description: "Checkout Page",
};

const CheckoutProductList = dynamic(() => import("@/app/components/CheckoutProductList"), { ssr: false });

export default function Page() {
    return (
        <div className="container grid min-h-screen grid-cols-1 gap-5 mx-auto my-5 lg:grid-cols-9">
            <div className="grid order-2 grid-rows-3 gap-5 lg:col-span-6 lg:order-1">
                <div className="row-span-2 bg-brand-600 rounded-xl">
                    <h1 className="p-5 text-2xl font-bold">Shipping Details</h1>
                    <div id="formDiv" className="flex flex-col gap-2 px-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="font-bold">Name</Label>
                            <Input type="text" id="name" className="w-full p-2 shadow-2xl" placeholder="e.g Nguyễn Văn A" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pnumber" className="font-bold">Phone Number</Label>
                            <Input type="text" id="pnumber" pattern="^(?:\+84|0)(3|5|7|8|9)\d{8}$" className="w-full p-2" placeholder="e.g 0376543210" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold">Email</Label>
                            <Input type="email" id="email" className="w-full p-2" placeholder="e.g ABG@hotmail.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address" className="font-bold">Address</Label>
                            <Input type="text" id="address" className="w-full p-2" placeholder="e.g. 702 Nguyễn Văn Linh" />
                        </div>
                        <div className="">
                            <VietnameseAddressInput />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="addNotes" className="font-bold">Additional Notes</Label>
                            <Textarea id="addNotes" className="w-full p-2 overflow-y-scroll border-none resize-y max-h-24 bg-brand-500 placeholder:text-slate-300" placeholder="e.g. No need to call before delivering" />
                        </div>
                    </div>
                </div>
                <PaymentMethod calculateLoan={calculateLoan} />
            </div>
            <div className="grid order-1 col-start-1 grid-rows-3 gap-5 lg:col-span-3 lg:col-start-7 lg:order-2">
                <div className="row-span-2">
                    <CheckoutProductList />
                </div>
                <div className="flex flex-col justify-end">
                    <OrderSummary location="checkout" /> {/* This is a placeholder for the OrderSummary component */}
                </div>
            </div>
        </div>
    )
        ;
}