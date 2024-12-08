"use client";

import { useState } from "react";
import { Search } from 'lucide-react';
import { Product } from '@/app/components/ProductCard';
import { useEffect } from "react";

    type SearchCompatibilityProps = {
        barType: string;
        onSelect: (item: Product | null) => void;
    };

    let apiUrlProducts = `http://localhost:3000/api/products`;
    let apiUrlVehicles = `http://localhost:3000/api/products`; // Remember to change later

export default function SearchBarCompatibility({barType, onSelect}: SearchCompatibilityProps) {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredResults, setFilteredResults] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            if (barType == "vehicles"){
                const res = await fetch(apiUrlVehicles);
                const data = await res.json();
                setProducts(data.data);
            } else {
                const res = await fetch(apiUrlProducts);
                const data = await res.json();
                setProducts(data.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };
        fetchProducts();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Filter the products based on the query
        if (value.trim() !== "") {
            const results = products.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredResults(results);
            // Call onSelect with null if there are more than one filtered result
            if (results.length !== 1) {
                onSelect(null);
            }
        } else {
        setFilteredResults([]);
        }
    };

    const handleProductClick = (name: string, id: string) => {
        setQuery(name); // Fill the search bar with the product name
        const product = filteredResults.find((item) => item._id === id);
        if (product) {
            setFilteredResults([product]);
            onSelect(product);
        } else {
        console.error("Product not found in filtered results.");
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
                        placeholder= {barType == "vehicles" ? "Search for vechicles..." : "Search for products..."}
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
                                onClick={() => handleProductClick(item.name, item._id)}
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
                                    No {barType == "vehicles" ? "vehicle" : "product"} with this name...
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}