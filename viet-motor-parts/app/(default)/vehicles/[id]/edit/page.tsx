import { Metadata } from "next";
import { fetchVehiclebyID } from "../fetchVehiclebyID";
import EditVehicleForm from "./EditVehicleForm";

export const metadata: Metadata = {
    title: "Edit Vehicle | Viet Motor Parts",
    description: "Edit Vehicle Details",
};

export default async function Page({ params }: { params: { id: string } }) {
    const vehicle = await fetchVehiclebyID(params.id);
    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Edit Vehicle Details</h1>
            <EditVehicleForm vehicle={vehicle} />
        </div>
    );
}
