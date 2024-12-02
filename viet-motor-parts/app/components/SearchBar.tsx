"use client";

import { useState } from "react";
import { Search } from 'lucide-react';

export default function SearchBar() {
    // Mock database
    const mockDatabase = [
        { id: 1, name: "EBC Double-H Sintered Brake Pads - FA244HH", image: "/ProductPlaceholder.webp" },
        { id: 2, name: "Yamaha YZF R15 Chain Sprocket Set", image: "/ProductPlaceholder.webp" },
        { id: 3, name: "NGK Spark Plug CR7HSA", image: "/ProductPlaceholder.webp" },
        { id: 4, name: "Mobil 1 Synthetic Motor Oil 10W-40", image: "/ProductPlaceholder.webp" },
        { id: 5, name: "Michelin Pilot Road 4 Tires - Front", image: "/ProductPlaceholder.webp" },
        { id: 6, name: "K&N High-Performance Air Filter - YA-1004", image: "/ProductPlaceholder.webp" },
        { id: 7, name: "DID 520VX3 X-Ring Chain", image: "/ProductPlaceholder.webp" },
        { id: 8, name: "Brembo Brake Disc - Rear", image: "/ProductPlaceholder.webp" },
        { id: 9, name: "Bosch Ignition Coil for Motorcycles", image: "/ProductPlaceholder.webp" },
        { id: 10, name: "Hella LED Fog Light Kit", image: "/ProductPlaceholder.webp" },
        { id: 11, name: "ProTaper EVO Handlebars - Oversize", image: "/ProductPlaceholder.webp" },
        { id: 12, name: "Yuasa YTX12-BS Maintenance-Free Battery", image: "/ProductPlaceholder.webp" },
        { id: 13, name: "Pirelli Diablo Rosso III Tires - Rear", image: "/ProductPlaceholder.webp" },
        { id: 14, name: "RK Chain 530XSOZ1 X-Ring", image: "/ProductPlaceholder.webp" },
        { id: 15, name: "Shark Spartan GT Carbon Helmet", image: "/ProductPlaceholder.webp" },
        { id: 16, name: "Scorpion EXO-R420 Full-Face Helmet", image: "/ProductPlaceholder.webp" },
        { id: 17, name: "Shoei GT-Air II Helmet", image: "/ProductPlaceholder.webp" },
        { id: 18, name: "Alpinestars SMX-6 V2 Riding Boots", image: "/ProductPlaceholder.webp" },
        { id: 19, name: "Dainese Racing 3 Leather Jacket", image: "/ProductPlaceholder.webp" },
        { id: 20, name: "Oxford Screamer Alarm Disc Lock", image: "/ProductPlaceholder.webp" },
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
                    <form action="submit">
                        <input
                            type="search"
                            id="default-search"
                            value={query}
                            onChange={handleSearch}
                            name='searchQuery'
                            className="block w-full p-4 text-sm text-gray-800 focus:outline-none rounded-lg bg-gray-50"
                            placeholder="Search for products"
                            required
                        />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-brand-400 hover:bg-brand-600 font-medium rounded-2xl text-sm px-4 pb-2 pt-1">
                            <Search />
                        </button>
                    </form>

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
                                    No part with this name...
                                </a>
                            </div>
                        </div>
                    )}
                    {/* Show "See all products" if there are more than 5 results */}
                    {filteredResults.length > maxResults && (
                        <div className="p-4 bg-brand-500 rounded-b">
                            <div className="flex items-center gap-4">
                                <a href="#" className="flex-1 text-brand-100">
                                    See all products...
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
