"use client";

import { useState } from "react";
import { Search } from 'lucide-react';

export default function SearchBarVehicles() {
    // Mock database for motorbikes
    const mockDatabase = [
        { id: 1, name: "Yamaha YZF-R1", image: "/BikePlaceholder.webp" },
        { id: 2, name: "Honda CBR1000RR-R Fireblade", image: "/BikePlaceholder.webp" },
        { id: 3, name: "Kawasaki Ninja ZX-10R", image: "/BikePlaceholder.webp" },
        { id: 4, name: "Suzuki GSX-R1000", image: "/BikePlaceholder.webp" },
        { id: 5, name: "Ducati Panigale V4", image: "/BikePlaceholder.webp" },
        { id: 6, name: "BMW S1000RR", image: "/BikePlaceholder.webp" },
        { id: 7, name: "Triumph Daytona Moto2 765", image: "/BikePlaceholder.webp" },
        { id: 8, name: "KTM RC 8C", image: "/BikePlaceholder.webp" },
        { id: 9, name: "MV Agusta F3 800", image: "/BikePlaceholder.webp" },
        { id: 10, name: "Aprilia RSV4 Factory", image: "/BikePlaceholder.webp" },
        { id: 11, name: "Yamaha MT-09", image: "/BikePlaceholder.webp" },
        { id: 12, name: "Honda CB650R", image: "/BikePlaceholder.webp" },
        { id: 13, name: "Kawasaki Z900", image: "/BikePlaceholder.webp" },
        { id: 14, name: "Suzuki GSX-S750", image: "/BikePlaceholder.webp" },
        { id: 15, name: "Ducati Monster", image: "/BikePlaceholder.webp" },
        { id: 16, name: "BMW F900R", image: "/BikePlaceholder.webp" },
        { id: 17, name: "Triumph Street Triple 765 RS", image: "/BikePlaceholder.webp" },
        { id: 18, name: "KTM 790 Duke", image: "/BikePlaceholder.webp" },
        { id: 19, name: "MV Agusta Brutale 800", image: "/BikePlaceholder.webp" },
        { id: 20, name: "Aprilia Tuono V4", image: "/BikePlaceholder.webp" },
    ];


    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState<typeof mockDatabase>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Filter the mock database based on the query
        if (value.trim() !== "") {
            const results = mockDatabase.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredResults(results);
        } else {
            setFilteredResults([]);
        }
    };

    const maxResults = 5;
    const displayedResults = filteredResults.slice(0, maxResults);  // Limit to 5 results

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
                        placeholder="Search for vehicles" 
                        required 
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-brand-400 hover:bg-brand-600 font-medium rounded-2xl text-sm px-4 pb-2 pt-1">
                        <Search />
                    </button>
                </div>
            </div>
            {/* Dropdown suggestions */}
            {query && (
                <div className="absolute w-full rounded-lg shadow-lg z-10">
                    {displayedResults.length > 0 ? (
                        displayedResults.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 bg-brand-500 border-b-2 border-brand-100 flex items-center gap-4"
                            >
                                <a href="#" className="h-12 w-12 shrink-0">
                                    <img
                                        className="h-full w-full rounded"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </a>
                                <a href="#" className="flex-1 text-brand-100 hover:underline">
                                    {item.name}
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 bg-brand-500 rounded-b">
                            <div className="flex items-center gap-4">
                                <a href="#" className="flex-1 text-brand-100">
                                    No vechicle with this name...
                                </a>
                            </div>
                        </div>
                    )}
                    {/* Show "See all products" if there are more than 5 results */}
                    {filteredResults.length > maxResults && (
                        <div className="p-4 bg-brand-500 rounded-b">
                            <div className="flex items-center gap-4">
                                <a href="#" className="flex-1 text-brand-100">
                                    See all vehicles...
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}