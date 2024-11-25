import { SearchBarVehicles } from "../components/SearchBarVehicles";
import SearchBar from "../components/SearchBar";
import { SideFilter } from "../components/SideFilter";
import { Button } from "../components/shadcn/button";

export default function Pages() {
    return (
        <form className="grid grid-cols-7 gap-6">
            <h1 className="text-brand-500 col-span-7 text-xl font-semibold m-auto">Note: Please type the EXACT name of your vehicle and product</h1>
            <div className="col-span-3">
                <SearchBarVehicles/>
                <div className="p-6 bg-brand-500 mt-4 rounded">
                    <div className="flex items-center gap-6">
                        <a href="#" className="min-w-0 flex-1 font-medium text-brand-100"> No vechicle with this name...</a>
                    </div>
                </div>
                <div className="p-6 bg-brand-500 mt-4 rounded">
                    <div className="flex items-center gap-6">
                        <a href="#" className="h-14 w-14 shrink-0">
                        <img className="h-full w-full" src="/ProductPlaceholder.webp" alt="A random motor" />
                        </a>

                        <a href="#" className="min-w-0 flex-1 font-medium text-brand-100 hover:underline"> Honda Civic MK-9</a>
                    </div>
                </div>
            </div>
            <div className="col-span-1 rounded">
                <button type="button" className="text-brand-100 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brand-100 font-medium rounded-lg text-sm px-5 text-center mx-auto flex justify-between items-center">Check compatibility <svg className="h-8 w-8 text-brand-100 mx-auto my-3"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />  <line x1="16" y1="21" x2="16" y2="19" />  <line x1="19" y1="16" x2="21" y2="16" />  <line x1="3" y1="8" x2="5" y2="8" />  <line x1="8" y1="3" x2="8" y2="5" /></svg></button>
                <span className="row-span-2 rounded bg-brand-400"></span>
            </div>
            <div className="col-span-3">
                <SearchBar/>
                <div className="p-6 bg-brand-500 mt-4 rounded">
                    <div className="flex items-center gap-6">
                        <a href="#" className="min-w-0 flex-1 font-medium text-brand-100"> No part with this name...</a>
                    </div>
                </div>
                <div className="space-y-4 p-6 bg-brand-500 mt-4 rounded">
                    <div className="flex items-center gap-6">
                        <a href="#" className="h-14 w-14 shrink-0">
                        <img className="h-full w-full" src="/ProductPlaceholder.webp" alt="A random motor part" />
                        </a>

                        <a href="#" className="min-w-0 flex-1 font-medium text-brand-100 hover:underline"> EBC Double-H Sintered Brake Pads - FA244HH </a>
                    </div>
                </div>
                <div className="space-y-4 p-6 bg-brand-500 mt-4 rounded">
                    <div className="flex items-center gap-6">
                        <a href="#" className="h-14 w-14 shrink-0">
                        <img className="h-full w-full" src="/ProductPlaceholder.webp" alt="A random motor part" />
                        </a>

                        <a href="#" className="min-w-0 flex-1 font-medium text-brand-100 hover:underline"> EBC Double-H Sintered Brake Pads - FA254HH </a>
                    </div>
                </div>            
            </div>
            <div className="col-span-7 flex justify-center">
                <svg className="h-28 w-28 text-brand-100"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />  <polyline points="22 4 12 14.01 9 11.01" /></svg>
                <svg className="h-28 w-28 text-brand-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
            </div>
            <h1 className="text-brand-100 col-span-7 text-3xl font-bold m-auto">The chosen vechicle and part are compatible!</h1>
            <h1 className="text-brand-500 col-span-7 text-3xl font-bold m-auto">The chosen vechicle and part are not compatible! / Invalid input!</h1>
        </form>
    );
}