"use client";

import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { formatCurrency } from "@/lib/utils";

interface CurrencyInputVietnamProps {
    className?: string;
    defaultValue?: number;
    onChange?: (value: number) => void;
}

export default function CurrencyInputVietnam({ className, defaultValue, onChange, }: CurrencyInputVietnamProps) {
    const [rawValue, setRawValue] = useState<string | undefined>(defaultValue?.toString() || '');

    const handleValueChange = (value: string | undefined): void => {
        // Parse value into a numeric format
        const numericValue = value ? parseInt(value.replace(/\D/g, ""), 10) : 0;
        setRawValue(value || "");
        if (onChange) {
          onChange(numericValue); // Trigger parent onChange with numeric value
        }
    };

    return (<div className="col-span-3">
        <CurrencyInput id="price" allowDecimals={false} suffix={"đ"} allowNegativeValue={false} className={twMerge(`form-control w-full rounded-md p-2 bg-white text-black focus:outline-none`, className)} onValueChange={handleValueChange} placeholder="e.g 120,000đ" value={rawValue} />
        <input id="price-real" type="number" name="price" min="0" value={rawValue?.replace(/\D/g, "") || 0} readOnly className="hidden" />
    </div>
    )
}
