"use client"

import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface CurrencyInputVietnamProps {
    className?: string;
}

export default function CurrencyInputVietnam({ className }: CurrencyInputVietnamProps) {
    const [rawValue, setRawValue] = useState<string | undefined>(' ');

    const validateValue = (value: string | undefined): void => {
        const rawValue = value === undefined ? 'undefined' : value;
        setRawValue(rawValue || ' ');
    };
    return (<div className="col-span-3">
        <CurrencyInput id="price" allowDecimals={false} suffix={"đ"} allowNegativeValue={false} className={twMerge(`form-control ${className} w-full rounded-md p-2 bg-white text-black focus:outline-none`, className)} onValueChange={validateValue} placeholder="e.g 120,000đ" />
        <input type="number" name="price" min="0" value={rawValue} className="hidden" />
    </div>

    )
}