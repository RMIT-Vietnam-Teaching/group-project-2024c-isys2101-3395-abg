"use client"

import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { useState } from "react";


export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to log in");
                setSuccess("");
            } else {
                setSuccess("Login successful!");
                setError("");

                // Save the token in localStorage
                localStorage.setItem("token", data.token);

                // Redirect to orders page
                window.location.href = "/orders/admin";
            }
        } catch (err) {
            console.error("Error logging in:", err);
            setError("An unexpected error occurred. Please try again.");
            setSuccess("");
        }
    };
    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                Log in to Admin account
            </h1>

            <form id="loginForm" className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-white font-semibold">
                        Username
                    </Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="e.g LazadaAdmin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-semibold">
                        Password
                    </Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="e.g r9mof6NlTd3AJ@3D"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl my-auto"
                    >
                        Log in
                    </Button>
                </div>
            </form>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </div>
    );
}