"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderTrackingVerify() {
    const [orderId, setOrderId] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderId(e.target.value);
        setErrorMessage(""); // Clear error message on input change
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        setErrorMessage(""); // Clear error message on input change
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message
        setLoading(true);
    
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    phone_number: phone, // Send phone number in headers for verification
                },
            });
    
            const data = await response.json();
            if (!response.ok) {
                setErrorMessage(data.error || "Invalid Order ID or Phone Number.");
            } else {
                // Redirect to the order details page with phone number as query parameter
                router.push(`/orders/${orderId}?phone_number=${phone}`);
            }
        } catch (error) {
            console.error("Error verifying order:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };    

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-200">
                    Track your order
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-brand-600 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="order-id" className="block text-sm font-semibold text-brand-100">
                                Order ID
                            </label>
                            <div className="mt-1">
                                <input
                                    id="order-id"
                                    name="order-id"
                                    type="text"
                                    required
                                    value={orderId}
                                    onChange={handleOrderIdChange}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your order ID"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-brand-100">
                                Phone Number
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        {errorMessage && (
                            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                                    loading
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-brand-300 text-white hover:bg-brand-100 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                }`}
                            >
                                {loading ? "Validating..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
