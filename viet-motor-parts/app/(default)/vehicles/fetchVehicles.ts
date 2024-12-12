export type Vehicle = {
    _id: string;
    make: string;
    vehicleModel: string;
    year: number;
};


export async function fetchVehicles(): Promise<Vehicle[]> {
    try {
        const res = await fetch(`http://localhost:3000/api/vehicles`, { cache: "no-store" });
        if (!res.ok) {
            console.error(`Failed to fetch vehicles, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
}
