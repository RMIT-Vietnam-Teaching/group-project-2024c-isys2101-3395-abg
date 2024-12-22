import AddVehicleForm from "./AddVehicleForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Vehicle | Viet Motor Parts",
    description: "Add a new vehicle to the database",
};

export default function Page() {
    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Add Vehicle</h1>
            <AddVehicleForm/>
        </div>
    );
}
