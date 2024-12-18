import { getAuthToken } from "@/lib/auth";
import fetchOrderbyID from "../fetchOrderbyID";
import { Label } from "@/app/components/shadcn/label";
import { Input } from "@/app/components/shadcn/input";
import { Button } from "@/app/components/shadcn/button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Edit Order Details | Viet Motor Parts'
};

export default async function Page({ params, }: { params: { id: string } }) {
    const token = await getAuthToken();
    const order = await fetchOrderbyID({ id: params.id, authToken: token });

    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Edit Order Details</h1>
            <form action="">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <Label htmlFor="customer_name" className="text-left lg:text-right font-bold">
                            Name
                        </Label>
                        <Input
                            id="customer_name" name="customer_name" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. Nguyễn Văn A"
                            defaultValue={order.customer_name}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <Label htmlFor="phone_number" className="text-left lg:text-right font-bold">
                            Phone Number
                        </Label>
                        <Input
                            id="phone_number" name="phone_number" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            pattern="^0[3|5|7|8|9]\\d{8}$"
                            placeholder="e.g. 0942506170"
                            defaultValue={order.phone_number}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <Label htmlFor="email" className="text-left lg:text-right font-bold">
                            Email
                        </Label>
                        <Input
                            id="email" name="email" type="email"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            pattern="^0[3|5|7|8|9]\\d{8}$"
                            placeholder="e.g. 0942506170"
                            defaultValue={order.email}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <Label htmlFor="address" className="text-left lg:text-right font-bold">
                            Address
                        </Label>
                        <Input
                            id="address" name="address" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. 1234 Main St, City, Country"
                            defaultValue={order.address}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <Label htmlFor="additional_notes" className="text-left lg:text-right font-bold">
                            Additional Notes
                        </Label>
                        <Input
                            id="additional_notes" name="additional_notes" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. No need to call before delivering."
                            defaultValue={order.additional_notes || ""}
                        />
                    </div>
                    {order.payment_method === 'Installment' && order.installment_details ?
                        <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                            <Label htmlFor="interest_rate" className="text-left lg:text-right font-bold">
                                Interest Rate
                            </Label>
                            <Input
                                id="interest_rate" name="interest_rate" type="number" step={0.01} min={6.0} max={12.0}
                                className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                                placeholder="e.g. No need to call before delivering."
                                defaultValue={order.installment_details.interest_rate}
                            />
                        </div>
                        : <></>}
                    <div className="flex justify-end">
                        <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Edit Order Information</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}