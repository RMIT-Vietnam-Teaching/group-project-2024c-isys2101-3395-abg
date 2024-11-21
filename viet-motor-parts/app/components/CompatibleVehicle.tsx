"use client"

import { useEffect, useState } from "react";

export default function CompatibleVehicle() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<{ users: { email: string; firstName: string; lastName: string; }[] }>({ users: [] });

    const fetchSuggestions = async () => {
        if (searchTerm.trim() === '') {
            setSuggestions({ users: [] });
            return;
        }
        fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
            .then((res) => res.json())
            .then((data) => { setSuggestions({ users: data.users }) })
            .catch((err) => console.error(err));
    };

    useEffect(() => { fetchSuggestions() }, [searchTerm]);
    return (
        <div>
            <div>
                <div>
                    <input type="text" name="" id="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for compatbile Vehicles" />
                </div>
                <ul>
                    {suggestions.users.map((user, index) => {
                        return <li key={user.email}><span>{user.firstName} {user.lastName}</span></li>;
                    })}
                </ul>
            </div>
        </div>
    );
}