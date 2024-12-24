'use server'

import { getAuthToken } from "@/lib/auth";
import { Vehicle } from "../fetchVehicles";
import { revalidatePath } from "next/cache";

export default async function createVehicle(vehicle : Partial<Vehicle>) {
    try {
        const token = await getAuthToken();
        const res = await fetch(`http://localhost:3000/api/vehicles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Add the admin token
            },
            body: JSON.stringify(vehicle),
        });

        if (res.ok){
            revalidatePath("/vehicles");
        }
        const data  = await res.json();
        return data;
      } catch (error) {
        return error;
      }

}