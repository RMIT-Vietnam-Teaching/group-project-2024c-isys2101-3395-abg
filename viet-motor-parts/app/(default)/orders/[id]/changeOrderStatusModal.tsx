import { Button } from "@/app/components/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/shadcn/dialog";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { getAuthToken } from "@/lib/auth";
import { CalendarCheck, CircleX, Clock, PackageCheck, PackageOpen, ShoppingBag, Truck } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";





const statusIcons: Map<string, React.ElementType> = new Map([
    ["Pending", Clock],
    ["Confirmed", CalendarCheck],
    ["Packaged", PackageCheck],
    ["Shipped", ShoppingBag],
    ["On The Way", Truck],
    ["Delivered", PackageOpen],
    ["Cancelled", CircleX],
]);


export default async function StatusModal({ order_id, current_status, validStatuses }: { order_id: string, current_status: string, validStatuses: { key: string; label: string }[] }) {

    async function updateStatus(formData: FormData) {
        'use server'
        const authToken = await getAuthToken();
        const order_status = formData.get("order-status") as string;
        let shipping_label;
        let body;
        if (current_status === "Packaged") {
            shipping_label = formData.get("shipping_label") as string;
            body = { order_status, shipping_label };
        } else {
            body = { order_status };
        }

        const res = await fetch(`${process.env.BACKEND_URL}/api/orders/${order_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(body)
            }
        )
        if (res.ok) {
            revalidatePath(`/orders/${order_id}`);
        } else {
            const data = await res.json();
            console.error(`Error: ${data.error}`);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Update Order Status</Button>
            </DialogTrigger>
            <DialogContent className="bg-brand-500 border-none shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Update Order Status</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-white">
                    Current Status of Order : <span className="font-semibold">{current_status}</span>
                </DialogDescription>
                <form id="changeStatus" action={updateStatus}>
                    <ul className={`grid w-full gap-6 ${validStatuses.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                        {validStatuses.map(({ key, label }) => {
                            const Icon = statusIcons.get(key);
                            return (
                                <li key={key}>
                                    <Input type="radio" id={key} name="order-status" value={key} className="hidden peer"></Input>
                                    <Label
                                        htmlFor={key}
                                        className="flex items-center justify-center w-full p-5 text-brand-100 bg-brand-400 border-2 border-brand-400 rounded-lg cursor-pointer peer-checked:border-brand-300 hover:text-brand-200 hover:bg-brand-500"
                                    >
                                        <div className="flex flex-col items-center">
                                            {Icon && <Icon />} {/* Render the appropriate icon */}
                                            <div className="w-full text-lg font-semibold">{label}</div>
                                        </div>
                                    </Label>
                                </li>
                            );
                        })}
                    </ul>
                    {current_status === "Packaged" ? (
                        <div className="mt-5 flex flex-col gap-2">
                            <Label htmlFor="shipping_label" className="text-white font-bold">Shipping Label</Label>
                            <Input type="text" id="shipping_label" name="shipping_label" className="w-full p-3 bg-white rounded-lg" />
                        </div>
                    ) : <></>}
                </form>
                <DialogFooter>
                    <Button type="submit" form="changeStatus" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Update Status</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}