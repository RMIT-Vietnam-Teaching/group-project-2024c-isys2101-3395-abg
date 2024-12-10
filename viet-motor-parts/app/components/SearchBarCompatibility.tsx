"use client";

import { useState, useEffect } from "react";
import { Search } from 'lucide-react';
import { Product } from "./CompatibilityCheckPage";

type SearchCompatibilityProps = {
    barType: string;
    onSelect: (item: Product | CompatibleVehicle | null) => void;
};

export interface CompatibleVehicle {
    _id: string;
    make: string;
    vehicleModel: string;
    year: number;
    name: string; // Computed property
}

let apiUrlProducts = `http://localhost:3000/api/products`;
let apiUrlVehicles = `http://localhost:3000/api/vehicles`;

export default function SearchBarCompatibility({ barType, onSelect }: SearchCompatibilityProps) {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState<(Product | CompatibleVehicle)[]>([]);
    const [filteredItems, setFilteredItems] = useState<(Product | CompatibleVehicle)[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(barType === "vehicles" ? apiUrlVehicles : apiUrlProducts);
                const data = await res.json();
                if (barType === "vehicles") {
                    const vehicles = data.data.map((vehicle: any) => ({
                        ...vehicle,
                        name: `${vehicle.make} ${vehicle.vehicleModel} ${vehicle.year}`
                    }));
                    setItems(vehicles);
                } else {
                    setItems(data.data);
                }
            } catch (error) {
                console.error('Error fetching products/vehicles:', error);
            }
        };
        fetchItems();
    }, [barType]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Filter the items based on the query
        if (value.trim() !== "") {
            const results = items.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(results);
            // Call onSelect with null if there are more than one filtered result
            if (results.length !== 1) {
                onSelect(null);
            }
        } else {
            setFilteredItems([]);
            onSelect(null);
        }
    };

    const handleItemClick = (name: string, id: string) => {
        setQuery(name); // Fill the search bar with the item name
        const item = filteredItems.find((item) => item._id === id);
        if (item) {
            setFilteredItems([item]);
            onSelect(item);
        } else {
            console.error("Item not found in filtered results.");
        }
    };

    const maxResults = 5;
    const displayedResults = filteredItems.slice(0, maxResults);  // Limit to 5 results

    return (
        <div className="relative w-full">
            <div className="w-full">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative w-full">
                    <input 
                        type="search" 
                        id="default-search" 
                        value={query} 
                        onChange={handleSearch} 
                        name='searchQuery' 
                        className="block w-full p-4 text-sm text-gray-800 focus:outline-none rounded-lg bg-gray-50" 
                        placeholder={barType === "vehicles" ? "Search for vehicles..." : "Search for products..."}
                        required 
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-brand-400 hover:bg-brand-600 font-medium rounded-2xl text-sm px-4 pb-2 pt-1">
                        <Search />
                    </button>
                </div>
            </div>
            {/* Dropdown suggestions */}
            {query && (
                <div className="w-full rounded-lg shadow-lg z-10">
                    {displayedResults.length > 0 ? (
                        displayedResults.map((item) => (
                            <div
                                key={item._id}
                                className="p-3 mt-3 bg-brand-600 border-2 border-brand-100 rounded flex items-center gap-4"
                                onClick={() => handleItemClick(item.name, item._id)}
                            >
                                <a href="#" className="h-12 w-12 shrink-0">
                                    <img
                                        className="h-full w-full rounded"
                                        src="/BikePlaceholder.webp"
                                        alt={item.name}
                                    />
                                </a>
                                <a href="#" className="flex-1 text-brand-100 hover:underline">
                                    {item.name}
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 mt-3 bg-brand-600 rounded-b">
                            <div className="flex items-center gap-4">
                                <a href="#" className="flex-1 text-brand-100">
                                    No {barType === "vehicles" ? "vehicle" : "product"} with this name...
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}