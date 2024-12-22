"use client";

import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchVehiclebyID } from "../fetchVehiclebyID";
import { Vehicle } from "../../fetchVehicles";
import { TriangleAlert } from 'lucide-react';

export default function EditVehicleForm({ vehicle }: { vehicle: Vehicle }) {
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const make = formData.get("make") as string;
        const vehicleModel = formData.get("model") as string;
        const year = formData.get("year") as string;
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/vehicles/${vehicle._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ make, vehicleModel, year: parseInt(year) })
            });

            if (!res.ok) {
                console.error(`Failed to update vehicle, Status: ${res.status}`);
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Vehicle updated:', data.data);

            // Navigate back to the vehicles page and reload
            router.push("/vehicles");
            router.refresh(); // This will reload the page to ensure updated data is displayed
        } catch (error) {
            console.error('Failed to update vehicle:', error);
        }
    }

    async function handleDelete() {
        const token = localStorage.getItem("token");

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
                console.error(`Failed to delete vehicle, Status: ${res.status}`);
                if (data.error === "Cannot delete vehicle: It is referenced by one or more products.") {
                    setError(data.error);
                } else {
                    alert("An error occurred while deleting the vehicle.");
                }
                return;
            }

            console.log('Vehicle deleted:', data.data);

            // Navigate back to the vehicles page and reload
            router.push("/vehicles");
            router.refresh(); // This will reload the page to ensure updated data is displayed
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
            alert("An error occurred while deleting the vehicle.");
        }
    }

    if (!vehicle) {
        return <p>Loading...</p>;
    }

    return (<div>
        <form action={handleSubmit}>
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
                        <Button type="button" onClick={handleDelete} className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Delete Vehicle</Button>
                        <Button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Update Vehicle</Button>
                    </div>
                </div>
            </form>
            {error && (
                    <div className="flex justify-center">
                        <div role="alert" className="alert alert-warning w-fit">
                            <TriangleAlert className="h-6 w-6 shrink-0 stroke-current" />
                            <span>{error}</span>
                        </div>
                    </div>
            )}
    </div>
    )
}