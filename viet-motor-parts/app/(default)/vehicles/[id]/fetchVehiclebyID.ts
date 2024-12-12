import { Vehicle } from "../fetchVehicles";



export async function fetchVehiclebyID(id: string): Promise<Vehicle> {
    try {
        const res = await fetch(`http://localhost:3000/api/vehicles/${id}`, { next: { revalidate: 300 } });
        if (!res.ok) {
            console.error(`Failed to fetch vehicle with ID: ${id}, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error(`Error fetching vehicle with ID: ${id}`, error);
        throw error;
    }
}
