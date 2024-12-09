"use client";

import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { formatCurrency } from "@/lib/utils";

interface CurrencyInputVietnamProps {
    className?: string;
    defaultValue?: number;
    name: string;
}

export default function CurrencyInputVietnam({ className, defaultValue, name }: CurrencyInputVietnamProps) {
    const [formattedValue, setFormattedValue] = useState<string | undefined>(
        defaultValue ? formatCurrency(defaultValue) : ''
    );

    const handleValueChange = (value: string | undefined): void => {
        setFormattedValue(value);
    };

    const handleRawValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const value = e.target.value;
        setFormattedValue(formatCurrency(Number(value) || 0));
    };


    return (
        <div className="col-span-3">
            <CurrencyInput
                id={name}
                allowDecimals={false}
                suffix="đ"
                allowNegativeValue={false}
                className={twMerge(
                    `form-control w-full rounded-md p-2 bg-white text-black focus:outline-none`,
                    className
                )}
                onValueChange={handleValueChange}
                placeholder="e.g 120,000đ"
                value={formattedValue}
            />
            <input
                id={`${name}-real`}
                type="number"
                name={name}
                min="0"
                onChange={handleRawValueChange}
                value={formattedValue?.replace(/\D/g, '') || ''}
                className="hidden"
            />
        </div>
    );
}
