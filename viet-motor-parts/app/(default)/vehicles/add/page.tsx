import { Label } from "@/app/components/shadcn/label";
import { Metadata } from "next";
import { Input } from "@/app/components/shadcn/input";
import { Button } from "@/app/components/shadcn/button";
import { getAuthToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";


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
                        <Button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">Add Vehicle</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
