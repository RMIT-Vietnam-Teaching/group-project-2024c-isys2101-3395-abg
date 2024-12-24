import Button from "@/app/components/Button";
import { fetchVehicles } from "./fetchVehicles";
import VehicleFilter from "./vehicleDisplay";
import { Metadata } from "next";

const metadata: Metadata = {
    title: "Vehicles | Viet Motor Parts",
    description: "All Vehicles of Viet Motor Parts",
};

export default async function Page() {
    const vehicles = await fetchVehicles();

    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-0">
                <h1 className="text-center text-5xl font-bold lg:col-start-2 ">Vehicles</h1>
                <div className="lg:col-start-3 flex justify-center items-center">
                    <Button title="Add Vehicle" link="/vehicles/add" />
                </div>
            </div>

            {/* Filterable Vehicle List */}
            <VehicleFilter vehicles={vehicles} />
        </div>
    );
}
