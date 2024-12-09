"use client";

import { useState } from "react";

export default function OrderTrackingVerify() {
    const [isOrderIdValid, setIsOrderIdValid] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOrderId(value);
        
        // Validate order ID
        if (value === "12345") {
            setIsOrderIdValid(true);
            setErrorMessage(""); // Clear error message if ID is valid
        } else {
            setIsOrderIdValid(false);
            setErrorMessage("Invalid Order ID. Please try again.");
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
                    <form className="space-y-6" action="#" method="POST">
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
                            {errorMessage && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errorMessage}
                                </p>
                            )}
                        </div>

                        {isOrderIdValid && (
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
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-300 hover:bg-brand-100 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
