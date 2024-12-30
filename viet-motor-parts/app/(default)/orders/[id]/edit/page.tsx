import { getAuthToken } from "@/lib/auth";
import fetchOrderbyID from "../fetchOrderbyID";
import { Label } from "@/app/components/shadcn/label";
import { Input } from "@/app/components/shadcn/input";
import { Button } from "@/app/components/shadcn/button";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
    title: 'Edit Order Details | Viet Motor Parts'
};

export default async function Page({ params }: { params: { id: string } }) {
    const token = await getAuthToken();
    const order = await fetchOrderbyID({ id: params.id, authToken: token });

    if (!order) {
        return <div>Order not found</div>;
    }

    async function updateOrderDetails(formData: FormData) {
        'use server';
        const customer_name = formData.get("customer_name") as string;
        const phone_number = formData.get("phone_number") as string;
        const email = formData.get("email") as string;
        const address = formData.get("address") as string;
        const additional_notes = formData.get("additional_notes") as string;

        let installment_details = null;

        if (order.payment_method === 'Installment' && order.installment_details) {
            const interest_rate = formData.get("interest_rate") as string;
            const parsed_interest_rate = parseFloat(interest_rate);

            const down_payment = order.installment_details?.down_payment || 0;
            const loan_term = order.installment_details?.loan_term || 0;
            const loanAmount = order.total_amount - down_payment;
            const monthlyRate = parsed_interest_rate / 100 / 12;

            const monthly_payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loan_term)) /
                (Math.pow(1 + monthlyRate, loan_term) - 1);
            const total_with_interest = monthly_payment * loan_term + down_payment;

            installment_details = {
                interest_rate: parsed_interest_rate,
                monthly_payment,
                total_with_interest,
                loan_term,
                down_payment,
            };
        }

        const response = await fetch(`http://localhost:3000/api/orders/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                customer_name,
                phone_number,
                email,
                address,
                additional_notes,
                ...(installment_details && { installment_details }),
            }),
        });

        const data = await response.json();

        if (response.ok) {
            revalidatePath(`/orders/${params.id}`);
            redirect(`/orders/${params.id}`);
        } else {
            console.error("Failed to update order details.", data);
        }
    }

    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Edit Order Details</h1>
            <form action={updateOrderDetails}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="customer_name" className="text-left lg:text-right font-bold">
                            Name
                        </Label>
                        <Input
                            id="customer_name"
                            name="customer_name"
                            type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. Nguyễn Văn A"
                            defaultValue={order.customer_name}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="phone_number" className="text-left lg:text-right font-bold">
                            Phone Number
                        </Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            pattern="^0[3|5|7|8|9]\\d{8}$"
                            placeholder="e.g. 0942506170"
                            defaultValue={order.phone_number}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="email" className="text-left lg:text-right font-bold">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. example@gmail.com"
                            defaultValue={order.email}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="address" className="text-left lg:text-right font-bold">
                            Address
                        </Label>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. 1234 Main St, City, Country"
                            defaultValue={order.address}
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="additional_notes" className="text-left lg:text-right font-bold">
                            Additional Notes
                        </Label>
                        <Input
                            id="additional_notes"
                            name="additional_notes"
                            type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. No need to call before delivering."
                            defaultValue={order.additional_notes || ""}
                        />
                    </div>
                    {order.payment_method === 'Installment' && order.installment_details && (
                        <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                            <Label htmlFor="interest_rate" className="text-left lg:text-right font-bold">
                                Interest Rate
                            </Label>
                            <Input
                                id="interest_rate"
                                name="interest_rate"
                                type="number"
                                step={0.01}
                                min={6.0}
                                max={12.0}
                                className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                                placeholder="e.g. 10.5"
                                defaultValue={order.installment_details.interest_rate || ""}
                            />
                        </div>
                    )}
                    <div className="flex justify-end">
                        <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">
                            Edit Order Information
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
