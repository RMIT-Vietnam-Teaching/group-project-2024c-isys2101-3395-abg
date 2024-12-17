import { CalendarCheck, PackageCheck } from "lucide-react";
import { Button } from "./shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./shadcn/dialog";
import { Input } from "./shadcn/input";



export default function StatusModal({ order_id, current_status }: { order_id: string, current_status: string }) {
    return (<Dialog>
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
            <form id="changeStatus" action="">
                <Input type="hidden" name="order_id" value={order_id}></Input>
                <ul className="grid w-full gap-6 md:grid-cols-2">
                    <li>
                        <Input type="radio" id="pending-option" name="order-status" value="Pending" className="hidden peer" required></Input>
                        <label htmlFor="pending-option" className="flex items-center justify-center w-full p-5 text-brand-100 bg-brand-400 border-2 border-brand-400 rounded-lg cursor-pointer peer-checked:border-brand-300 hover:text-brand-200 hover:bg-brand-500">
                            <div className="flex flex-col items-center">
                                <PackageCheck />
                                <div className="w-full text-lg font-semibold">Pending</div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <Input type="radio" id="confirmed-option" name="order-status" value="Confirmed" className="hidden peer"></Input>
                        <label htmlFor="confirmed-option" className="flex items-center justify-center w-full p-5 text-brand-100 bg-brand-400 border-2 border-brand-400 rounded-lg cursor-pointer peer-checked:border-brand-300 hover:text-brand-200 hover:bg-brand-500">
                            <div className="flex flex-col items-center">
                                <CalendarCheck />
                                <div className="w-full text-lg font-semibold">Confirmed</div>
                            </div>
                        </label>
                    </li>
                </ul>
            </form>
            <DialogFooter>
                <Button type="submit" form="changeStatus" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Update Status</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog >)
}