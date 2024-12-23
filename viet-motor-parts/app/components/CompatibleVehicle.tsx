"use client";

import { useEffect, useState } from "react";
import { Input } from "./shadcn/input";
import { X } from "lucide-react";
import { Vehicle } from "../(default)/vehicles/fetchVehicles";

interface CompatibleVehicleProps {
  vehicles?: Vehicle[];
  onSelect: (selectedVehicles: string[]) => void;
  selectedVehicleIds?: string[];
}

export default function CompatibleVehicle({
  vehicles = [],
  onSelect,
  selectedVehicleIds = [],
}: CompatibleVehicleProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Vehicle[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);

  // Fetch compatible vehicles based on search term
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() === "") {
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

    const debounceTimeout = setTimeout(fetchSuggestions, 300); // Debounce API calls
    return () => clearTimeout(debounceTimeout); // Cleanup
  }, [searchTerm]);

  // Initialize selected vehicles from preselected IDs
  useEffect(() => {
    const initializeSelectedVehicles = async () => {
      if (selectedVehicleIds.length > 0) {
        try {
          const res = await fetch(`/api/vehicles?ids=${selectedVehicleIds.join(",")}`);
          const data = await res.json();
          if (data.success) {
            setSelectedVehicles(data.data);
          }
        } catch (err) {
          console.error("Error fetching initial selected vehicles:", err);
        }
      }
    };

    initializeSelectedVehicles();
  }, [selectedVehicleIds]);

  // Update parent component when selected vehicles change
  useEffect(() => {
    onSelect(selectedVehicles.map((v) => v._id));
  }, [selectedVehicles, onSelect]);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    if (!selectedVehicles.find((v) => v._id === vehicle._id)) {
      setSelectedVehicles([...selectedVehicles, vehicle]);
    }
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleRemoveVehicle = (vehicleId: string) => {
    setSelectedVehicles(selectedVehicles.filter((v) => v._id !== vehicleId));
  };

  return (
    <div className="col-span-3 flex flex-col gap-2 justify-center">
      {/* Search Input */}
      <div>
        <Input
          className="text-black w-full bg-white placeholder:text-black"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for compatible vehicles"
        />
      </div>

      {/* Suggestions List */}
      <ul className="overflow-y-scroll max-h-[150px]">
        {suggestions.map(
          (vehicle) =>
            !selectedVehicles.find((v) => v._id === vehicle._id) && (
              <li
                key={vehicle._id}
                onClick={() => handleSelectVehicle(vehicle)}
                className="p-2 bg-brand-300 text-white hover:bg-brand-500 border-b-2 hover:cursor-pointer"
              >
                <h3>
                  {vehicle.make} {vehicle.vehicleModel} ({vehicle.year})
                </h3>
              </li>
            )
        )}
      </ul>

      {/* Selected Vehicles */}
      <div className="flex flex-row gap-3 flex-wrap">
        {selectedVehicles.map((vehicle) => (
          <span
            key={vehicle._id}
            className="bg-white text-black p-1 rounded-lg flex flex-row items-center gap-2"
          >
            <h3 className="font-bold">
              {vehicle.make} {vehicle.vehicleModel} ({vehicle.year})
            </h3>
            <X
              className="w-4 h-4 hover:text-red-600 rounded-lg hover:cursor-pointer"
              onClick={() => handleRemoveVehicle(vehicle._id)}
            />
          </span>
        ))}
        {/* Hidden Input for Form Submission */}
        <input
          type="text"
          name="compatibleVehicles"
          hidden
          value={JSON.stringify(selectedVehicles.map((v) => v._id))}
        />
      </div>
    </div>
  );
}