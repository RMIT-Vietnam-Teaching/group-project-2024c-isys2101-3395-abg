import { Metadata } from "next";
import { fetchVehiclebyID } from "../fetchVehiclebyID";
import EditVehicleForm from "./EditVehicleForm";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const res = await fetchVehiclebyID(params.id);

    return {
        title: `Edit ${res.make} ${res.vehicleModel} (${res.year}} | Viet Motor Parts`,
        description: `Edit ${res.make} details`,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const vehicle = await fetchVehiclebyID(params.id);
    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Edit Vehicle Details</h1>
            <EditVehicleForm vehicle={vehicle}/>
        </div>
    );
}
