import { Button } from "@/app/components/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/shadcn/dialog";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { getAuthToken } from "@/lib/auth";
import { CalendarCheck, CircleX, Package, PackageCheck } from "lucide-react";
import { revalidatePath } from "next/cache";



async function updateStatus(formData: FormData) {
    'use server'
    const authToken = await getAuthToken();
    const order_id = formData.get("order_id") as string;
    const order_status = formData.get("order-status") as string;
    const res = await fetch(`http://localhost:3000/api/orders/${order_id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ order_status })
        }
    )
    if (res.ok) {
        revalidatePath(`/orders/${order_id}`);
    }
}


export default function StatusModal({ order_id, current_status }: { order_id: string, current_status: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Update Order Status</Button>
            </DialogTrigger>
            <DialogContent className="bg-brand-500 border-none shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Update Order Status</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-white">
                    Current Status of Order : <span className="font-semibold">{current_status}</span>
                </DialogDescription>
                <form id="changeStatus" action={updateStatus}>
                    <Input type="hidden" name="order_id" value={order_id}></Input>
                    <ul className="grid w-full gap-6 md:grid-cols-2">
                        <li>
                            <Input type="radio" id="pending-option" name="order-status" value="Pending" className="hidden peer" required></Input>
                            <Label htmlFor="pending-option" className="flex items-center justify-center w-full p-5 text-brand-100 bg-brand-400 border-2 border-brand-400 rounded-lg cursor-pointer peer-checked:border-brand-300 hover:text-brand-200 hover:bg-brand-500">
                                <div className="flex flex-col items-center">
                                    <PackageCheck />
                                    <div className="w-full text-lg font-semibold">Pending</div>
                                </div>
                            </Label>
                        </li>
                        <li>
                            <Input type="radio" id="confirmed-option" name="order-status" value="Confirmed" className="hidden peer"></Input>
                            <Label htmlFor="confirmed-option" className="flex items-center justify-center w-full p-5 text-brand-100 bg-brand-400 border-2 border-brand-400 rounded-lg cursor-pointer peer-checked:border-brand-300 hover:text-brand-200 hover:bg-brand-500">
                                <div className="flex flex-col items-center">
                                    <CalendarCheck />
                                    <div className="w-full text-lg font-semibold">Confirmed</div>
                                </div>
                            </Label>
                        </li>
                        <li>
                            <Input type="radio" id="confirmed-option" name="order-status" value="Cancelled" className="hidden peer"></Input>
                            <Label htmlFor="confirmed-option" className="flex items-center justify-center w-full p-5 text-brand-100 bg-brand-400 border-2 border-brand-400 rounded-lg cursor-pointer peer-checked:border-brand-300 hover:text-brand-200 hover:bg-brand-500">
                                <div className="flex flex-col items-center">
                                    <CircleX />
                                    <div className="w-full text-lg font-semibold">Cancelled</div>
                                </div>
                            </Label>
                        </li>
                        <li>
                            <Input type="radio" id="confirmed-option" name="order-status" value="Packaged" className="hidden peer"></Input>
                            <Label htmlFor="confirmed-option" className="flex items-center justify-center w-full p-5 text-brand-100 bg-brand-400 border-2 border-brand-400 rounded-lg cursor-pointer peer-checked:border-brand-300 hover:text-brand-200 hover:bg-brand-500">
                                <div className="flex flex-col items-center">
                                    <Package />
                                    <div className="w-full text-lg font-semibold">Packaged</div>
                                </div>
                            </Label>
                        </li>
                    </ul>
                </form>
                <DialogFooter>
                    <Button type="submit" form="changeStatus" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Update Status</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}