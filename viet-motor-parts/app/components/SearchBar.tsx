"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<
    Array<{ id: string; name: string; image: string }>
  >([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      try {
        // Fetch products from the database using the query
        const response = await fetch(`/api/products?query=${encodeURIComponent(value)}`);
        const result = await response.json();

        if (result.success) {
          const products = result.data.map((product: any) => ({
            id: product._id,
            name: product.name,
            image: "/ProductPlaceholder.webp", // Use placeholder image for now
          }));
          setFilteredResults(products);
        } else {
          setFilteredResults([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setFilteredResults([]);
      }
    } else {
      setFilteredResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim() === "") {
      setFilteredResults([]);
      return;
    }

    // Update the URL with the query parameter and navigate
    router.push(`/products?query=${encodeURIComponent(query)}`);
  };

  const maxResults = 5;
  const displayedResults = filteredResults.slice(0, maxResults); // Limit to 5 results

  return (
    <div className="relative w-full">
      <div className="w-full">
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="relative w-full">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="search"
              id="default-search"
              value={query}
              onChange={handleSearch}
              name="searchQuery"
              className="block w-full rounded-lg bg-gray-50 p-4 text-sm text-gray-800 focus:outline-none"
              placeholder="Search for products"
              required
            />
            <button
              type="submit"
              className="absolute bottom-2.5 end-2.5 rounded-2xl bg-brand-400 px-4 pb-2 pt-1 text-sm font-medium text-white hover:bg-brand-600"
            >
              <Search />
            </button>
          </form>
        </div>
      </div>
      {/* Dropdown suggestions */}
      {query && (
        <div className="absolute z-10 w-full rounded-lg shadow-lg">
          {displayedResults.length > 0 ? (
            displayedResults.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b-2 border-brand-100 bg-brand-500 p-4"
              >
                <a href={`/products/${item.id}`} className="h-12 w-12 shrink-0">
                  <img
                    className="h-full w-full rounded"
                    src={item.image}
                    alt={item.name}
                  />
                </a>
                <a href={`/products/${item.id}`} className="flex-1 text-brand-100 hover:underline">
                  {item.name}
                </a>
              </div>
            ))
          ) : (
            <div className="rounded-b bg-brand-500 p-4">
              <div className="flex items-center gap-4">
                <a href="#" className="flex-1 text-brand-100">
                  No part with this name...
                </a>
              </div>
            </div>
          )}
          {/* Show "See all products" if there are more than 5 results */}
          {filteredResults.length > maxResults && (
            <div className="rounded-b bg-brand-500 p-4">
              <div className="flex items-center gap-4">
                <a href="/products" className="flex-1 text-brand-100">
                  See all products...
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
