'use server'

import { getAuthToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Vehicle } from "../../fetchVehicles";






export async function updateVehicle(id: string, updates: Partial<Vehicle>) {
    try {
        const token = await getAuthToken();
        const res = await fetch(`http://localhost:3000/api/vehicles/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Add the admin token
            },
            body: JSON.stringify(updates),
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






