import SearchBarCompatibility from "@/app/components/SearchBarCompatibility";
import SearchBar from "../../components/SearchBar";
import { Button } from "../../components/shadcn/button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Part Compatability Check | Viet Motor Parts",
    description: "Part Compatability Check page",
};

export default function Page() {
    return (
        <form className="grid grid-cols-1 gap-6 md:grid-cols-7">
            {/* Left Section */}
            <div className="col-span-1 md:col-span-3">
                <SearchBarCompatibility barType="vehicles"/>                
            </div>

            {/* Button Section */}
            <div className="col-span-1 md:col-span-1 flex flex-col items-center md:order-none order-11">
                <button
                    type="button" disabled
                    className={`${true /* replace with your disabled logic */
                        ? 'bg-gray-400 cursor-not-allowed text-brand-600'
                        : 'bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:bg-gradient-to-br'
                        } text-brand-100 focus:ring-4 focus:outline-none focus:ring-brand-100 font-medium rounded-lg text-sm px-4 py-2 text-center flex justify-start items-center`}
                >
                    Check Compatibility
                    <svg className="h-6 w-6 ml-3 md:ml-0" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                        <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        <line x1="16" y1="21" x2="16" y2="19" />
                        <line x1="19" y1="16" x2="21" y2="16" />
                        <line x1="3" y1="8" x2="5" y2="8" />
                        <line x1="8" y1="3" x2="8" y2="5" />
                    </svg>
                </button>
            </div>


            {/* Right Section */}
            <div className="col-span-1 md:col-span-3">
                <SearchBar/>
                <div className="p-4 bg-brand-500 mt-4 rounded">
                    <div className="flex items-center gap-4">
                        <a href="#" className="flex-1 text-brand-100">No part with this name...</a>
                    </div>
                </div>
                <div className="p-4 bg-brand-500 mt-4 rounded">
                    <div className="flex items-center gap-4">
                        <a href="#" className="h-12 w-12 shrink-0">
                            <img className="h-full w-full rounded" src="/ProductPlaceholder.webp" alt="A random motor part" />
                        </a>
                        <a href="#" className="flex-1 text-brand-100 hover:underline">EBC Double-H Sintered Brake Pads - FA244HH</a>
                    </div>
                </div>
                <div className="p-4 bg-brand-500 mt-4 rounded">
                    <div className="flex items-center gap-4">
                        <a href="#" className="h-12 w-12 shrink-0">
                            <img className="h-full w-full rounded" src="/ProductPlaceholder.webp" alt="A random motor part" />
                        </a>
                        <a href="#" className="flex-1 text-brand-100 hover:underline">EBC Double-H Sintered Brake Pads - FA254HH</a>
                    </div>
                </div>
            </div>
            <div className="col-span-1 md:col-span-7 flex justify-center items-center md:order-none order-12 rounded-2xl">
                <div className="flex flex-col md:flex-row items-center bg-brand-600 rounded p-3">
                    <svg className="h-20 w-20 text-brand-100" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <path d="M9 12l2 2l4 -4" /></svg>
                    <div className="ml-3 text-center md:text-left">
                        <h1 className="text-brand-100 text-xl md:text-2xl font-bold mb-2">Compatible!</h1>
                        <h2 className="text-brand-100 text-sm md:text-lg font-bold">The chosen vehicle and part are compatible!</h2>
                    </div>
                </div>
            </div>
            <div className="col-span-1 md:col-span-7 flex justify-center items-center md:order-none order-12 rounded-2xl">
                <div className="flex flex-col md:flex-row items-center bg-brand-100 rounded p-3">
                    <svg className="h-20 w-20 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-3 text-center md:text-left">
                        <h1 className="text-brand-600 text-xl md:text-2xl font-bold mb-2">Not compatible!</h1>
                        <h2 className="text-brand-600 text-sm md:text-lg font-bold">The chosen vehicle and part are not compatible!</h2>
                    </div>
                </div>
            </div>
        </form>
    );
}
