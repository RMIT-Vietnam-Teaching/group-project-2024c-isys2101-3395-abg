import OrderSummary from "@/app/components/OrderSummary";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Textarea } from "@/app/components/shadcn/textarea";
import { Metadata } from "next/types";
export const metadata: Metadata = {
    title: "Checkout | Viet Motor Parts",
    description: "Checkout Page",
};

export default function Page() {
    return (
        <div className="container mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-9 gap-5 my-5">
            <div className="lg:col-span-6 order-2 lg:order-1 grid grid-rows-3 gap-5">
                <div className="row-span-2 bg-brand-600 rounded-xl">
                    <h1 className="p-5 text-2xl font-bold">Shipping Details</h1>
                    <div id="formDiv" className="flex flex-col px-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="font-bold">Name</Label>
                            <Input type="text" id="name" className="w-full shadow-2xl p-2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pnumber" className="font-bold">Phone Number</Label>
                            <Input type="text" id="pnumber" pattern="^(?:\+84|0)(3|5|7|8|9)\d{8}$" className="w-full  p-2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pnumber" className="font-bold">Email</Label>
                            <Input type="email" id="pnumber" className="w-full  p-2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address" className="font-bold">Address</Label>
                            <Input type="text" id="address" className="w-full p-2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="addNotes" className="font-bold">Additional Notes</Label>
                            <Textarea id="addNotes" className="w-full p-2 bg-brand-500 border-none resize-none overflow-y-scroll" />
                        </div>
                    </div>
                </div>
                <div className="bg-brand-600 rounded-xl">
                    <h1 className="p-5 text-2xl font-bold">Payment Method</h1>
                    <div className="flex gap-5 flex-col px-5">
                        <div className="flex items-center ps-4 bg-brand-400 rounded-2xl">
                            <input id="PayPal" type="radio" value="paypal" name="paymentMethod" className="w-4 h-4 accent-brand-200">
                            </input>
                            <label htmlFor="PayPal" className="w-full py-4 ms-2 text-md font-semibold text-white">PayPal</label>
                        </div>
                        <div className="flex items-center ps-4 bg-brand-400 rounded-2xl ">
                            <input id="CoD" type="radio" value="CoD" name="paymentMethod" className="w-4 h-4 accent-brand-200">
                            </input>
                            <label htmlFor="CoD" className="w-full py-4 ms-2 text-md font-semibold text-white">Cash on Delivery</label>
                        </div>
                        <div className="flex items-center ps-4 bg-brand-400 rounded-2xl">
                            <input id="installment" type="radio" value="installment" name="paymentMethod" className="w-4 h-4 accent-brand-200">
                            </input>
                            <label htmlFor="installment" className="w-full py-4 ms-2 text-md font-semibold text-white">Buy Now, Pay Later</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-3 lg:col-start-7 col-start-1 order-1 lg:order-2 grid grid-rows-2 gap-10">
                <div className="">Product List</div>
                <div className="flex flex-col justify-end">
                    <OrderSummary /> {/* This is a placeholder for the OrderSummary component */}
                </div>
            </div>
        </div>
    )
        ;
}