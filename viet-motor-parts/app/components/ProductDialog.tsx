import { Button } from "./shadcn/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./shadcn/dialog";
import { Label } from "./shadcn/label";
import { Textarea } from "./shadcn/textarea";
import CurrencyInputVietnam from "./CurrencyInputVietnam";

export default function ProductDialog() {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="bg-brand-500 border-none shadow-lg">
                <DialogHeader >
                    <DialogTitle className="text-xl font-bold">Add Product</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-white font-semibold text-center lg:text-left">
                    <p>Add a new product to your shop</p>
                </DialogDescription>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <label htmlFor="name" className="text-left lg:text-right font-bold">
                            Name
                        </label>
                        <input
                            id="name"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="description" className="text-left lg:text-right font-bold">
                            Description
                        </Label>
                        <Textarea id="description" className="col-span-3 bg-white text-black" />
                    </div>
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center gap-2 lg:gap-4">
                        <Label htmlFor="price" className="text-left lg:text-right font-bold">
                            Price (VND)
                        </Label>
                        <CurrencyInputVietnam />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}