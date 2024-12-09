"use client";

import { useState, useEffect } from 'react';

export default function OrderID() {
    const [orderID, setOrderID] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Fetch the Order ID from localStorage when the component mounts
        const storedOrderID = localStorage.getItem("orderID");
        if (storedOrderID) {
            setOrderID(storedOrderID);
        }
    }, []);

    function handleCopyToClipboard() {
        if (orderID) {
            navigator.clipboard.writeText(orderID);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }
    }

    return (
        <div>
            {orderID ? (
                <p className="font-semibold">
                    Here is your Order ID: #{" "}
                    <span
                        className={`font-extrabold hover:underline hover:cursor-pointer tooltip ${
                            success ? 'tooltip-success' : 'tooltip-info'
                        } tooltip-bottom`}
                        id="orderID"
                        data-tip={success ? "Successful" : "Copy to Clipboard"}
                        onClick={handleCopyToClipboard}
                    >
                        {orderID}
                    </span>
                </p>
            ) : (
                <p className="font-semibold">Order ID not found</p>
            )}
        </div>
    );
}
