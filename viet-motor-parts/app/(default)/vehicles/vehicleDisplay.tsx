"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import { Vehicle } from "./fetchVehicles";


export default function VehicleFilter({ vehicles }: { vehicles: Vehicle[] }) {
    const [filterTerm, setFilterTerm] = useState("");

    // Filter vehicles dynamically as the user types
    const filteredVehicles = vehicles.filter(vehicle =>
        `${vehicle.make} ${vehicle.vehicleModel} ${vehicle.year}`
            .toLowerCase()
            .includes(filterTerm.toLowerCase())
    );

    return (
        <div>
            {/* Search Input */}
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search vehicles..."
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    className="border rounded-md p-2 w-full lg:w-1/2 text-black"
                />
            </div>

            {/* Vehicle List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle: Vehicle) => (
                        <div key={vehicle._id} className="bg-brand-500 p-4 rounded-md shadow-md flex justify-between">
                            <div className="flex items-center">
                                <h2 className="text-xl font-bold">
                                    {vehicle.make} {vehicle.vehicleModel} ({vehicle.year})
                                </h2>
                            </div>
                            <div className="flex items-center">
                                <Button title="Edit" link={`vehicles/${vehicle._id}/edit`} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl col-span-3">No vehicles found</p>
                )}
            </div>
        </div>
    );
}
