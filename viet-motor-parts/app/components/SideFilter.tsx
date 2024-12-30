"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";
import { Category } from "../(default)/categories/page";

interface SideFilterProps {
  categories: Category[];
}


export function SideFilter(props: SideFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = props.categories || [];
  const [selectedCategory, setSelectedCategory] = useState<string[]>(searchParams.get("category")?.split(",") || []);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "name");
  const [order, setOrder] = useState(searchParams.get("order") || "asc");
  const [priceFrom, setPriceFrom] = useState<number | null>(null);
  const [priceTo, setPriceTo] = useState<number | null>(null);


  useEffect(() => {
    updateQuery({ category: selectedCategory });
  }, [selectedCategory]);

  useEffect(() => {
    updateQuery({ sortBy, order });
  }, [sortBy, order]);

  useEffect(() => {
    const params: Record<string, string | string[]> = {};
    if (priceFrom !== null) params.priceFrom = priceFrom.toString();
    else params.priceFrom = '';

    if (priceTo !== null) params.priceTo = priceTo.toString();
    else params.priceTo = '';

    updateQuery(params);
  }, [priceFrom, priceTo]);

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedCategory((prevCategories: string[]) => {
      if (checked) {
        return [...prevCategories, value];
      } else {
        return prevCategories.filter((category) => category !== value);
      }
    });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "price_from") {
      setPriceFrom(value ? parseInt(value) : null);
    } else if (id === "price_to") {
      setPriceTo(value ? parseInt(value) : null);
    }
  };

  const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "lowToHigh") {
      setSortBy("price");
      setOrder("asc");
    } else if (value === "highToLow") {
      setSortBy("price");
      setOrder("desc");
    } else if (value === "aToZ") {
      setSortBy("name");
      setOrder("asc");
    } else if (value === "zToA") {
      setSortBy("name");
      setOrder("desc");
    }
  };

  const updateQuery = (params: Record<string, string | string[]>) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(key, value.join(','));
        } else {
          searchParams.delete(key);
        }
      } else {
        if (value) {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }
      }
    });
    router.push(`/products?${searchParams.toString()}`);
  };

  // Track open accordion panels
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((section) => section !== id) : [...prev, id]
    );
  };

  const isOpen = (id: string) => openSections.includes(id);

  return (
    <div className="z-10 w-full p-3 bg-brand-100 rounded-lg shadow">
      <h1 className="text-brand-500 text-xl font-bold">
        <svg
          className="h-8 w-8 text-brand-400 inline-block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>{" "}
        Sort & Filter
      </h1>

      {/* Category Accordion */}
      <div className="my-3">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className={`flex items-center justify-between w-full py-3 font-medium text-brand-500 border-b border-gray-200 gap-3 rounded ${isOpen("category") ? "bg-white" : ""
            }`}
        >
          <h6 className="mx-3 text-xl font-medium">Category</h6>
          <svg
            className={`w-4 h-4 mx-3 transform ${isOpen("category") ? "rotate-180" : ""
              }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
        {isOpen("category") && (
          <ul className="space-y-2 text-lg mt-3 ml-2">
            {categories.map((category: Category) => (
              <li key={category._id} className="flex items-center">
                <input
                  id={category._id} // Use category ID for the input and label association
                  type="checkbox"
                  onChange={handleCategoryChange}
                  value={category._id} // Use category ID as the value
                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-brand-400 focus:ring-brand-400 focus:ring-2"
                  checked={selectedCategory.includes(category._id)}
                />
                <label
                  htmlFor={category._id} // Match label with the input ID (category ID)
                  className="ml-2 text-lg font-medium text-brand-400"
                >
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>


      {/* Price Accordion */}
      <div className="my-3">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className={`flex items-center justify-between w-full py-3 font-medium text-brand-500 border-b border-gray-200 gap-3 rounded ${isOpen("price") ? "bg-white" : ""
            }`}
        >
          <h6 className="mx-3 text-xl font-medium">Price</h6>
          <svg
            className={`w-4 h-4 mx-3 transform ${isOpen("price") ? "rotate-180" : ""
              }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
        {isOpen("price") && (
          <div className="grid gap-6 mb-6 md:grid-cols-2 mt-4">
            <div>
              <input
                type="number"
                id="price_from"
                className="bg-gray-50 border border-gray-300 text-brand-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-lg"
                placeholder="From"
                value={priceFrom != null ? priceFrom : ""}
                onChange={handlePriceChange}
              />
              <span className="relative left-24 bottom-9 text-brand-600">VND</span>
            </div>
            <div>
              <input
                type="number"
                id="price_to"
                className="bg-gray-50 border border-gray-300 text-brand-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-lg"
                placeholder="To"
                value={priceTo != null ? priceTo : ""}
                onChange={handlePriceChange}
              />
              <span className="relative left-24 bottom-9 text-brand-600">VND</span>
            </div>
          </div>
        )}
      </div>

      {/* Sort By Accordion */}
      <div className="my-3">
        <button
          type="button"
          onClick={() => toggleSection("radio")}
          className={`flex items-center justify-between w-full py-3 font-medium text-brand-500 border-b border-gray-200 gap-3 rounded ${isOpen("radio") ? "bg-white" : ""
            }`}
        >
          <h6 className="mx-3 text-xl font-medium">Sort By</h6>
          <svg
            className={`w-4 h-4 mx-3 transform ${isOpen("radio") ? "rotate-180" : ""
              }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
        {isOpen("radio") && (
          <div className="flex flex-col m-3">
            <div key="lowToHigh" className="flex items-center my-1">
              <input
                id="lowToHigh"
                type="radio"
                value="lowToHigh"
                name="radio-filter"
                onChange={handleSortChange}
                className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 focus:ring-2"
                checked={sortBy === "price" && order === "asc"}
              />
              <label
                htmlFor="lowToHigh"
                className="ml-2 text-lg font-medium text-brand-500"
              >
                Price (Low to High)
              </label>
            </div>
            <div key="highToLow" className="flex items-center my-1">
              <input
                id="highToLow"
                type="radio"
                value="highToLow"
                name="radio-filter"
                onChange={handleSortChange}
                className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 focus:ring-2"
                checked={sortBy === "price" && order === "desc"}
              />
              <label
                htmlFor="highToLow"
                className="ml-2 text-lg font-medium text-brand-500"
              >
                Price (High to Low)
              </label>
            </div>
            <div key="aToZ" className="flex items-center my-1">
              <input
                id="aToZ"
                type="radio"
                value="aToZ"
                name="radio-filter"
                onChange={handleSortChange}
                checked={sortBy === "name" && order === "asc"}
                className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 focus:ring-2"
              />
              <label
                htmlFor="aToZ"
                className="ml-2 text-lg font-medium text-brand-500"
              >
                Alphabetical order (A - Z)
              </label>
            </div>
            <div key="zToA" className="flex items-center my-1">
              <input
                id="zToA"
                type="radio"
                value="zToA"
                name="radio-filter"
                onChange={handleSortChange}
                className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 focus:ring-2"
                checked={sortBy === "name" && order === "desc"}
              />
              <label
                htmlFor="zToA"
                className="ml-2 text-lg font-medium text-brand-500"
              >
                Alphabetical order (Z - A)
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
