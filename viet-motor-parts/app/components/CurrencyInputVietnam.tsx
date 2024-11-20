"use client"

import CurrencyInput from "react-currency-input-field";
import { useState } from "react";

export default function CurrencyInputVietnam() {
    const [errorMessage, setErrorMessage] = useState('');
    const [className, setClassName] = useState('');
    const [rawValue, setRawValue] = useState<string | undefined>(' ');

    const validateValue = (value: string | undefined): void => {
        const rawValue = value === undefined ? 'undefined' : value;
        setRawValue(rawValue || ' ');

        if (!value) {
            setClassName('');
        } else if (Number.isNaN(Number(value))) {
            setErrorMessage('Please enter a valid number');
            setClassName('is-invalid');
        } else {
            setClassName('is-valid');
        }
    };
    return (
        <CurrencyInput id="price" name="price" allowDecimals={false} suffix={"đ"} allowNegativeValue={false} className={`form-control ${className} col-span-3 rounded-md p-2 bg-white text-black focus:outline-none`} onValueChange={validateValue} />
    )
}