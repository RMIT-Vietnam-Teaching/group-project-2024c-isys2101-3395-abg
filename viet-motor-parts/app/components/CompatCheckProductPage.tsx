"use client";

import { useState, useEffect } from "react";
import { Product } from "../(default)/products/page";
import { CircleCheck, CirclePlus, Link } from 'lucide-react';
import { CompatibleVehicle } from "./SearchBarCompatibility";

type CompatCheckProductPageProps = {
    product: Product;
};

let apiUrlVehicles = `http://localhost:3000/api/vehicles`;

export function CompatCheckProductPage({product}: CompatCheckProductPageProps) {
    const [query, setQuery] = useState("");
    const [vehicles, setVehicles] = useState<CompatibleVehicle[]>([]);
    const [filteredVehicles, setFilteredVehicles] = useState<CompatibleVehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<CompatibleVehicle | null>(null);
    const [isCompatible, setIsCompatible] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await fetch(apiUrlVehicles);
                const data = await res.json();
                const vehiclesWithNames = data.data.map((vehicle: any) => ({
                    ...vehicle,
                    name: `${vehicle.make} ${vehicle.vehicleModel} ${vehicle.year}`
                }));
                setVehicles(vehiclesWithNames);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };
        fetchVehicles();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() !== "") {
            const results = vehicles.filter((vehicle) =>
                vehicle.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredVehicles(results);
            if (results.length === 1) {
                setSelectedVehicle(results[0]);
                handleCheckCompatibility(results[0]);
            } else {
                setSelectedVehicle(null);
                setIsCompatible(null);
            }
        } else {
            setFilteredVehicles([]);
            setSelectedVehicle(null);
            setIsCompatible(null);
        }
    };

    const handleVehicleClick = (name: string, id: string) => {
        setQuery(name);
        const vehicle = filteredVehicles.find((vehicle) => vehicle._id === id);
        if (vehicle) {
            setFilteredVehicles([vehicle]);
            setSelectedVehicle(vehicle);
            handleCheckCompatibility(vehicle);
        } else {
            console.error("Vehicle not found in filtered results.");
        }
    };

    const handleCheckCompatibility = (vehicle: CompatibleVehicle) => {
        const compatible = product.compatible_vehicles.includes(vehicle._id);
        setIsCompatible(compatible);
    };

    const maxResults = 5;
    const displayedResults = filteredVehicles.slice(0, maxResults);

    return (<div className="" id="compatabilityCheck">
                <label
                    htmlFor="part-compatible"
                    className="text-lg font-bold text-brand-100"
                >
                    Part Compatibility Check:
                </label>
                <input
                    type="text"
                    id="part-compatible"
                    value={query}
                    onChange={handleSearch}
                    className="mt-2 block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500"
                    placeholder="Input your motor model here..."
                />
                {query && (
                    <div className="w-full rounded-lg shadow-lg z-10">
                        {displayedResults.length > 0 ? (
                            displayedResults.map((vehicle) => (
                                <div
                                    key={vehicle._id}
                                    className="p-3 mt-3 bg-brand-600 border-2 border-brand-100 rounded flex items-center gap-4"
                                    onClick={() => handleVehicleClick(vehicle.name, vehicle._id)}
                                >
                                    <a href="#" className="flex-1 text-brand-100 hover:underline">
                                        {vehicle.name}
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 mt-3 bg-brand-600 rounded-b">
                                <div className="flex items-center gap-4">
                                    <a href="#" className="flex-1 text-brand-100">
                                        No vehicle with this name...
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className={`order-12 col-span-1 flex items-center justify-center rounded-2xl md:order-none md:col-span-7 ${isCompatible === null ? 'invisible' : ''}`}>
                    <div className={`my-3 flex flex-col items-center rounded p-3 md:flex-row ${isCompatible ? 'bg-brand-400' : 'bg-brand-100'}`}>
                        {isCompatible ? (
                            <>
                                <CircleCheck size={80} className="text-brand-100"/>
                                <div className="ml-3 text-center md:text-left">
                                    <h1 className="mb-2 text-xl font-bold text-brand-100 md:text-2xl">
                                        Compatible!
                                    </h1>
                                    <h2 className="text-sm font-bold text-brand-100 md:text-lg">
                                        The chosen vehicle and part are compatible!
                                    </h2>
                                </div>
                            </>
                        ) : (
                            <>
                                <CirclePlus size={80} className="text-brand-600" style={{ transform: 'rotate(45deg)' }} />
                                <div className="ml-3 text-center md:text-left">
                                    <h1 className="mb-2 text-xl font-bold text-brand-600 md:text-2xl">
                                        Not compatible!
                                    </h1>
                                    <h2 className="text-sm font-bold text-brand-600 md:text-lg">
                                        The chosen vehicle and part are not compatible!
                                    </h2>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>)
}