"use client"

import { useEffect, useState } from "react";
import { Input } from "./shadcn/input";
import { X } from "lucide-react";

export default function CompatibleVehicle() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<{ vehicles: { email: string; firstName: string; lastName: string; }[] }>({ vehicles: [] });
    const [selectedVehicles, setSelectedVehicles] = useState<{ vehicles: { email: string; firstName: string; lastName: string; }[] }>({ vehicles: [] });
    const [selectedVehicleSet, setSelectedVehicleSet] = useState<Set<string>>(new Set());

    const fetchSuggestions = async () => {
        if (searchTerm.trim() === '') {
            setSuggestions({ vehicles: [] });
            return;
        }
        fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
            .then((res) => res.json())
            .then((data) => { setSuggestions({ vehicles: data.users }) }) // replace data.users with data.vehicles
            .catch((err) => console.error(err));
    };

    useEffect(() => { fetchSuggestions() }, [searchTerm]);

    const handleSelectVehicles = (vehicles: { email: string; firstName: string; lastName: string; }) => {
        setSelectedVehicles({ vehicles: [...selectedVehicles.vehicles, vehicles] });
        setSelectedVehicleSet(new Set([...selectedVehicleSet, vehicles.email]));
        setSearchTerm('');
        setSuggestions({ vehicles: [] });
    };


    return (
        <div className="col-span-3 flex flex-col gap-2 justify-center">
            <div>
                <Input className="text-black w-full bg-white placeholder:text-black" type="text" name="" id="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for compatible vehicles" />
            </div>
            <ul className="overflow-y-scroll max-h-[150px]">
                {suggestions.vehicles.map((vehicle, index) => {
                    return !selectedVehicleSet.has(vehicle.email) ? (
                        <li key={vehicle.email} onClick={() => handleSelectVehicles(vehicle)}>
                            <div className=" p-2 bg-brand-300 text-white hover:bg-brand-500 border-b-2 hover:cursor-pointer">
                                <h3>{vehicle.firstName} {vehicle.lastName}</h3>
                            </div>
                        </li>) : null;
                })}
            </ul>
            <div className="flex flex-row gap-3">
                {selectedVehicles.vehicles.map((vehicle, index) => {
                    return (
                        <span key={vehicle.email} className="bg-white text-black p-1 rounded-lg flex flex-row items-center gap-2">
                            <h3 className="font-bold">{vehicle.firstName} {vehicle.lastName}</h3>
                            <X className="w-4 h-4 hover:text-red-600 rounded-lg hover:cursor-pointer" onClick={() => {
                                setSelectedVehicles({ vehicles: selectedVehicles.vehicles.filter((v) => v.email !== vehicle.email) });
                                setSelectedVehicleSet(new Set([...selectedVehicleSet].filter((email) => email !== vehicle.email)));
                            }} />
                        </span>
                    );
                })}
                <input type="text" name="compatibleVehicles" hidden value={JSON.stringify(selectedVehicles)} />
            </div>
        </div>
    );
}