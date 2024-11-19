import { Search } from 'lucide-react';

export default function SearchBar(){
    return (
<form className="w-full">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative w-full">
        <input type="search" id="default-search" className="block w-full p-4 text-sm text-gray-900 focus:outline-none rounded-lg bg-gray-50" placeholder="Search" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-brand-400 hover:bg-brand-600 font-medium rounded-2xl text-sm px-4 py-2">
            <Search />
        </button>
    </div>
</form>
    )
}