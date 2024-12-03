"use client"

import { useState, useEffect } from 'react';


export default function OrderID() {
    const [orderID, setOrderID] = useState<string | null>("12345");
    const [success, setSuccess] = useState<boolean>(false);

    function handleCopytoClipboard() {
        navigator.clipboard.writeText(orderID!);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    }

    return (
        <>
            <p className="font-semibold">Here is your Order ID: #
                <span className={`font-extrabold hover:underline hover:cursor-pointer tooltip ${success ? 'tooltip-success' : 'tooltip-info'} tooltip-bottom`} id="orderID" data-tip={success === false ? "Copy to Clipboard" : "Successful"} onClick={handleCopytoClipboard}>123</span>
            </p>
        </>
    )

}