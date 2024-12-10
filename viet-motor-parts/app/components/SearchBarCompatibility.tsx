"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Product } from "@/app/components/ProductCard";

const apiUrls = {
  vehicles: `http://localhost:3000/api/vehicles`, // Adjust API for vehicles
  products: `http://localhost:3000/api/products`,
};

type SearchCompatibilityProps = {
  barType: keyof typeof apiUrls; // Restrict barType to "vehicles" or "products"
  onSelect: (item: Product | CompatibleVehicle | null) => void;
};

export type CompatibleVehicle = {
  _id: string;
  make: string;
  vehicleModel: string;
  year: number;
};

export default function SearchBarCompatibility({
  barType,
  onSelect,
}: SearchCompatibilityProps) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<(Product | CompatibleVehicle)[]>([]);
  const [filteredResults, setFilteredResults] = useState<
    (Product | CompatibleVehicle)[]
  >([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(apiUrls[barType]);
        const data = await res.json();
        setItems(data.data);
      } catch (error) {
        console.error(`Error fetching ${barType}:`, error);
      }
    };
    fetchItems();
  }, [barType]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      const results = items.filter((item) =>
        barType === "vehicles"
          ? `${(item as CompatibleVehicle).make} ${(item as CompatibleVehicle).vehicleModel}`
              .toLowerCase()
              .includes(value.toLowerCase())
          : (item as Product).name?.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredResults(results);

      // Call onSelect with null if multiple or no results
      if (results.length !== 1) {
        onSelect(null);
      }
    } else {
      setFilteredResults([]);
    }
  };

  const handleItemClick = (id: string) => {
    const selectedItem = filteredResults.find((item) => item._id === id);
    if (selectedItem) {
      onSelect(selectedItem);
    } else {
      console.error(`${barType} not found in filtered results.`);
    }
  };

  const maxResults = 5;
  const displayedResults = filteredResults.slice(0, maxResults);

  return (
    <div className="relative w-full">
      <div className="w-full">
        <label
          htmlFor={`${barType}-search`}
          className="sr-only mb-2 text-sm font-medium text-gray-900"
        >
          Search
        </label>
        <div className="relative w-full">
          <input
            type="search"
            id={`${barType}-search`}
            value={query}
            onChange={handleSearch}
            name={`${barType}Query`}
            className="block w-full rounded-lg bg-gray-50 p-4 text-sm text-gray-800 focus:outline-none"
            placeholder={`Search for ${barType}...`}
            required
          />
          <button
            type="button"
            className="absolute bottom-2.5 end-2.5 rounded-2xl bg-brand-400 px-4 pb-2 pt-1 text-sm font-medium text-white hover:bg-brand-600"
          >
            <Search />
          </button>
        </div>
      </div>
      {/* Dropdown suggestions */}
      {query && (
        <div className="z-10 w-full rounded-lg shadow-lg">
          {displayedResults.length > 0 ? (
            displayedResults.map((item) => (
              <div
                key={item._id}
                className="mt-3 flex items-center gap-4 rounded border-2 border-brand-100 bg-brand-600 p-3"
                onClick={() => handleItemClick(item._id)}
              >
                <a href="#" className="h-12 w-12 shrink-0">
                  <img
                    className="h-full w-full rounded"
                    src="/BikePlaceholder.webp"
                    alt={
                      barType === "vehicles"
                        ? (item as CompatibleVehicle).vehicleModel
                        : (item as Product).name
                    }
                  />
                </a>
                <a href="#" className="flex-1 text-brand-100 hover:underline">
                  {barType === "vehicles"
                    ? `${(item as CompatibleVehicle).make} ${(item as CompatibleVehicle).vehicleModel}`
                    : (item as Product).name}
                </a>
              </div>
            ))
          ) : (
            <div className="mt-3 rounded-b bg-brand-600 p-4">
              <div className="flex items-center gap-4">
                <a href="#" className="flex-1 text-brand-100">
                  No {barType === "vehicles" ? "vehicle" : "product"} found...
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
