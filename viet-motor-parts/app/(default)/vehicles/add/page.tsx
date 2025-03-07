import { Label } from "@/app/components/shadcn/label";
import { Metadata } from "next";
import { Input } from "@/app/components/shadcn/input";
import { Button } from "@/app/components/shadcn/button";
import { getAuthToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import AddVehicleForm from "./AddVehicleForm";


export const metadata: Metadata = {
    title: "Add Vehicle | Viet Motor Parts",
    description: "Add a new vehicle to the database",
};

export default async function Page() {
    async function handleSubmit(formData: FormData) {
        'use server'
        const make = formData.get("make") as string;
        const vehicleModel = formData.get("model") as string;
        const year = formData.get("year") as string;
        const token = await getAuthToken();

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/vehicles', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ make, vehicleModel, year: parseInt(year) })
            });

            if (!res.ok) {
                console.error(`Failed to add vehicle, Status: ${res.status}`);
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Vehicle added:', data.data);
            revalidatePath("/vehicles");
        } catch (error) {
            console.error('Failed to add vehicle:', error);
        }
    }
    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Add Vehicle</h1>
            <AddVehicleForm />
        </div>
    );
}
