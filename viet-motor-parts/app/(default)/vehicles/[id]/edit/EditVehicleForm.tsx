"use client";

import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth";
import { Vehicle } from "../../fetchVehicles";
import { CircleXIcon } from 'lucide-react';
import { useFormState, useFormStatus } from "react-dom";
import { updateVehicle } from "./updateVehicle";

export default function EditVehicleForm({ vehicle }: { vehicle: Vehicle }) {
    const router = useRouter();
    const [error, formAction] = useFormState(editVehicle, null);
    const [deleteError, deleteFormAction] = useFormState(handleDelete, null);

    async function editVehicle(state: any, formData: FormData) {
        const make = formData.get("make") as string;
        const vehicleModel = formData.get("model") as string;
        const year = parseInt(formData.get("year") as string, 10);
        const token = await getAuthToken();

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        const vehicleToUpdate = {
            make,
            vehicleModel,
            year
        };

        const res = await updateVehicle(vehicle._id, vehicleToUpdate);
        if (res.success) {
            router.push('/vehicles');
        } else {
            return res.error;
        }
    }

    async function handleDelete() {
        const token = await getAuthToken();

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/vehicles/${vehicle._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                return data.error;
            }


            // Navigate back to the vehicles page and reload
            router.push("/vehicles");
            router.refresh(); // This will reload the page to ensure updated data is displayed
        } catch (error) {
            return error;
        }
    }

    if (!vehicle) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <form action={formAction} id="editVehicle">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-row-2 lg:grid-cols-4 items-center  gap-2 lg:gap-4">
                        <Label htmlFor="make" className="text-left lg:text-right font-bold">
                            Make
                        </Label>
                        <Input
                            id="make" name="make" type="text"
                            className="col-span-3 rounded-md p-2 bg-white text-black focus:outline-none"
                            placeholder="e.g. Honda"
                            defaultValue={vehicle.make}
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
                            defaultValue={vehicle.vehicleModel}
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
                            defaultValue={vehicle.year}
                        />
                    </div>
                    <div className="flex gap-3 justify-end">
                        <SubmitButton />
                    </div>
                </div>
            </form>
            <form action={deleteFormAction} className="flex justify-end" id="deleteVehicle">
                <DeleteButton />
            </form>
            {
                error ? (
                    <div className="flex justify-center">
                        <div role="alert" className="alert alert-error">
                            <CircleXIcon />
                            <span>{error}</span>
                        </div>
                    </div>
                ) : <></>
            }
            {
                deleteError ? (
                    <div className="flex justify-center">
                        <div role="alert" className="alert alert-error">
                            <CircleXIcon />
                            <span>{deleteError}</span>
                        </div>
                    </div>
                ) : <></>
            }
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" disabled={pending}>
            {pending ? "Submitting" : "Edit Vehicle"}
        </Button>
    )
}

function DeleteButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" disabled={pending}>
            {pending ? "Deleting" : "Delete Vehicle"}
        </Button>
    )
}