"use client";

import React, { useState } from "react";

export function SideFilter() {
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
      <h1 className="text-brand-500 text-xl font-bold mx-4">
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
        Filter
      </h1>

      {/* Category Accordion */}
      <div className="my-3">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className={`flex items-center justify-between w-full py-3 font-medium text-brand-500 border-b border-gray-200 gap-3 rounded ${
            isOpen("category") ? "bg-white" : ""
          }`}
        >
          <h6 className="mx-3 text-xl font-medium">Category (Checkbox)</h6>
          <svg
            className={`w-4 h-4 mx-3 transform ${
              isOpen("category") ? "rotate-180" : ""
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
            {["Oil", "Wheels", "Brakes", "Engines"].map((item) => (
              <li key={item} className="flex items-center">
                <input
                  id={item.toLowerCase()}
                  type="checkbox"
                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-brand-400 focus:ring-brand-400 focus:ring-2"
                />
                <label
                  htmlFor={item.toLowerCase()}
                  className="ml-2 text-lg font-medium text-brand-400"
                >
                  {item}
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
          className={`flex items-center justify-between w-full py-3 font-medium text-brand-500 border-b border-gray-200 gap-3 rounded ${
            isOpen("price") ? "bg-white" : ""
          }`}
        >
          <h6 className="mx-3 text-xl font-medium">Price (Input filter)</h6>
          <svg
            className={`w-4 h-4 mx-3 transform ${
              isOpen("price") ? "rotate-180" : ""
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
                className="bg-gray-50 border border-gray-300 text-brand-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-lg"
                placeholder="From"
              />
            </div>
            <div>
              <input
                type="number"
                id="price_to"
                className="bg-gray-50 border border-gray-300 text-brand-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-lg"
                placeholder="To"
              />
            </div>
          </div>
        )}
      </div>

      {/* Radio Filter Accordion */}
      <div className="my-3">
        <button
          type="button"
          onClick={() => toggleSection("radio")}
          className={`flex items-center justify-between w-full py-3 font-medium text-brand-500 border-b border-gray-200 gap-3 rounded ${
            isOpen("radio") ? "bg-white" : ""
          }`}
        >
          <h6 className="mx-3 text-xl font-medium">A Radio Filter</h6>
          <svg
            className={`w-4 h-4 mx-3 transform ${
              isOpen("radio") ? "rotate-180" : ""
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
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center my-1">
                <input
                  id={`radio-${num}`}
                  type="radio"
                  value={num}
                  name="radio-filter"
                  className="w-4 h-4 text-brand-400 bg-gray-100 border-gray-300 focus:ring-brand-400 focus:ring-2"
                />
                <label
                  htmlFor={`radio-${num}`}
                  className="ml-2 text-lg font-medium text-brand-500"
                >
                  Choice {num}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
