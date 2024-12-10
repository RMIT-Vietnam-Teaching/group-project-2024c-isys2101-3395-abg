"use client";

import { useState } from "react";
import { CircleCheck, CirclePlus, Link } from 'lucide-react';
import SearchBarCompatibility, { CompatibleVehicle } from "@/app/components/SearchBarCompatibility";

export interface Product {
    _id: string;
    name: string;
    price: number;
    image_base64: string;
    description: string;
    brand: string;
    stock_quantity: number;
    category_id: string;
    compatible_vehicles: Array<string>;
}

type SelectedItem = Product | CompatibleVehicle | null;

export default function CompatabilityCheckPage(){
    const [selectedVehicle, setSelectedVehicle] = useState<SelectedItem>(null);
    const [selectedProduct, setSelectedProduct] = useState<SelectedItem>(null);
    const [isCompatible, setIsCompatible] = useState<boolean | null>(null);

    const handleCheckCompatibility = () => {
        if (selectedProduct && selectedVehicle) {
            const product = selectedProduct as Product;
            const vehicle = selectedVehicle as CompatibleVehicle;

            const compatible = product.compatible_vehicles.includes(vehicle._id);

            setIsCompatible(compatible);
        } else {
            setIsCompatible(false);
        }
    };

    const isButtonDisabled = selectedVehicle == null || selectedProduct == null;

    return (
    <form className="grid grid-cols-1 gap-6 md:grid-cols-7">
        {/* Left Section */}
        <div className="col-span-1 md:col-span-3">
            <SearchBarCompatibility barType="vehicles" onSelect={(item) => setSelectedVehicle(item as CompatibleVehicle)}/>                
        </div>

        {/* Button Section */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-center md:order-none order-11">
            {/* Button Section */}
            <button
                type="button"
                disabled={isButtonDisabled}
                onClick={handleCheckCompatibility}
                className={`${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed text-brand-600'
                    : 'bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:bg-gradient-to-br'
                    } text-brand-100 focus:ring-4 focus:outline-none focus:ring-brand-100 font-medium rounded-lg text-sm px-4 py-2 text-center flex justify-start items-center`}
            >
                Check Compatibility
                <Link size={25} strokeWidth={1.5}/>
            </button>
        </div>

        {/* Right Section */}
        <div className="col-span-1 md:col-span-3">
            <SearchBarCompatibility barType="products" onSelect={setSelectedProduct}/>      
        </div>
        {isCompatible !== null && (
        isCompatible ? 
        (<div className="col-span-1 md:col-span-7 flex justify-center items-center md:order-none order-12 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center bg-brand-600 rounded p-3">
                <CircleCheck size={100} className="text-brand-100"/>
                <div className="ml-3 text-center md:text-left">
                    <h1 className="text-brand-100 text-xl md:text-2xl font-bold mb-2">Compatible!</h1>
                    <h2 className="text-brand-100 text-sm md:text-lg font-bold">The chosen vehicle and part are compatible!</h2>
                </div>
            </div>
        </div>) :
        (<div className="col-span-1 md:col-span-7 flex justify-center items-center md:order-none order-12 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center bg-brand-100 rounded p-3">
                <CirclePlus size={100} className="text-brand-600" style={{ transform: 'rotate(45deg)' }}/>
                <div className="ml-3 text-center md:text-left">
                    <h1 className="text-brand-600 text-xl md:text-2xl font-bold mb-2">Not compatible!</h1>
                    <h2 className="text-brand-600 text-sm md:text-lg font-bold">The chosen vehicle and part are not compatible!</h2>
                </div>
            </div>
        </div>))}
    </form>)
}