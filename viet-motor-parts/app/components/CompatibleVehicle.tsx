"use client";

import { useEffect, useState } from "react";
import { Input } from "./shadcn/input";
import { X } from "lucide-react";

type Vehicle = {
    _id: string;
    make: string;
    vehicleModel: string;
    year: number;
};

export default function CompatibleVehicle() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Vehicle[]>([]);
    const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicleSet, setSelectedVehicleSet] = useState<Set<string>>(new Set());

    const fetchSuggestions = async () => {
        if (searchTerm.trim() === '') {
            setSuggestions([]);
            return;
        }
        try {
            const res = await fetch(`/api/vehicles?name=${searchTerm}`);
            const data = await res.json();
            if (data.success) {
                setSuggestions(data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, [searchTerm]);

    const handleSelectVehicle = (vehicle: Vehicle) => {
        setSelectedVehicles([...selectedVehicles, vehicle]);
        setSelectedVehicleSet(new Set([...selectedVehicleSet, vehicle._id]));
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleRemoveVehicle = (vehicleId: string) => {
        setSelectedVehicles(selectedVehicles.filter(v => v._id !== vehicleId));
        setSelectedVehicleSet(new Set([...selectedVehicleSet].filter(id => id !== vehicleId)));
    };

    return (
        <div className="col-span-3 flex flex-col gap-2 justify-center">
            <div>
                <Input
                    className="text-black w-full bg-white placeholder:text-black"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for compatible vehicles"
                />
            </div>
            <ul className="overflow-y-scroll max-h-[150px]">
                {suggestions.map(vehicle => (
                    !selectedVehicleSet.has(vehicle._id) && (
                        <li
                            key={vehicle._id}
                            onClick={() => handleSelectVehicle(vehicle)}
                            className="p-2 bg-brand-300 text-white hover:bg-brand-500 border-b-2 hover:cursor-pointer"
                        >
                            <h3>{vehicle.make} {vehicle.vehicleModel} ({vehicle.year})</h3>
                        </li>
                    )
                ))}
            </ul>
            <div className="flex flex-row gap-3 flex-wrap">
                {selectedVehicles.map(vehicle => (
                    <span
                        key={vehicle._id}
                        className="bg-white text-black p-1 rounded-lg flex flex-row items-center gap-2"
                    >
                        <h3 className="font-bold">{vehicle.make} {vehicle.vehicleModel} ({vehicle.year})</h3>
                        <X
                            className="w-4 h-4 hover:text-red-600 rounded-lg hover:cursor-pointer"
                            onClick={() => handleRemoveVehicle(vehicle._id)}
                        />
                    </span>
                ))}
                <input
                    type="text"
                    name="compatibleVehicles"
                    hidden
                    value={JSON.stringify(selectedVehicles.map(v => v._id))}
                />
            </div>
        </div>
    );
}
