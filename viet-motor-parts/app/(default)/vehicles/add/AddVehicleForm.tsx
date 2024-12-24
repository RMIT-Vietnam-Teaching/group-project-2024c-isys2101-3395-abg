'use client'

import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { useFormState, useFormStatus } from "react-dom";
import createVehicle from "./createVehicle";
import { useRouter } from "next/navigation";
import { CircleXIcon } from "lucide-react";

export default function AddVehicleForm() {
    const router = useRouter();
    const [error, formAction] = useFormState(addVehicle, null);

    async function addVehicle(state: any, formData: FormData) {
        const make = formData.get("make") as string;
        const vehicleModel = formData.get("model") as string;
        const year = formData.get("year") as string;

        const vehicle = {
            make,
            vehicleModel,
            year: parseInt(year)
        };

        const res = await createVehicle(vehicle);
        if (res.success) {
            router.push('/vehicles');
        } else {
            return res.error;
        }

    }
    return (
        <form action={formAction}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                    <Label htmlFor="make" className="text-left lg:text-right font-bold">
                        Make
                    </Label>
                    <Input
                        id="make" name="make" type="text"
                        className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                        placeholder="e.g. Honda"
                    />
                </div>
                <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                    <Label htmlFor="model" className="text-left lg:text-right font-bold">
                        Model
                    </Label>
                    <Input
                        id="model" name="model" type="text"
                        className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                        placeholder="e.g. Vision"
                    />
                </div>
                <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                    <Label htmlFor="year" className="text-left lg:text-right font-bold">
                        Year
                    </Label>
                    <Input
                        id="year" name="year" type="number"
                        className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                        min={1900}
                        max={new Date().getFullYear() + 1}
                        placeholder="e.g. 2020"
                    />
                </div>
                <div className="flex justify-end">
                    <SubmitButton />
                </div>
            </div>
            {error ? (
                <div className="flex justify-center">
                    <div role="alert" className="alert alert-error">
                        <CircleXIcon />
                        <span>{error}</span>
                    </div>
                </div>
            ) : <></>}
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (<Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" disabled={pending}>{pending ? 'Submitting' : 'Add Vehicle'}</Button>)
}