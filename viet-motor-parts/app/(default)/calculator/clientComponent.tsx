'use client'

import { useState } from 'react'
import { Button } from "@/app/components/shadcn/button"
import { Input } from "@/app/components/shadcn/input"
import { Label } from "@/app/components/shadcn/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/shadcn/card"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/shadcn/alert"
import { AlertCircle, CircleXIcon, ShoppingCartIcon } from 'lucide-react'
import CurrencyInputVietnam from '@/app/components/CurrencyInputVietnam'
import { LoanCalculationResult } from './calculation'

interface CalculateLoanResult {
    error?: string
    interestRate?: string
    monthlyPayment?: string
    totalPayment?: string
}
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

export default function CreditScoreForm({ calculateLoan }: { calculateLoan: (formData: FormData) => Promise<LoanCalculationResult> }) {
    const [result, setResult] = useState<LoanCalculationResult | null>(null);

    async function handleSubmit(formData: FormData) {
        const calculationResult = await calculateLoan(formData)
        setResult(calculationResult)
    }

    function importFromCart() {
        const total = localStorage.getItem('total') || '';
        document.getElementById("price")?.setAttribute('value', total);
        document.getElementById("price-real")?.setAttribute('value', total);
    }

    return (
        <Card className="w-full max-w-md mx-auto text-white border-none shadow-xl bg-brand-600">
            <CardHeader>
                <CardTitle className='text-center lg:text-left'>Interest Rate Calculator</CardTitle>
                <CardDescription className='text-white'>Calculate your interest rate and monthly payment based on your down payment and loan term</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="loanTerm" className='font-semibold'>Total Amount (VNĐ)</Label>
                        <CurrencyInputVietnam className='flex w-full px-3 py-1 text-white transition-colors rounded-md shadow-sm h-9 bg-brand-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' name='price' />
                        <Button type='button' onClick={importFromCart} className="w-full bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 hover:bg-gradient-to-bl font-bold"> <ShoppingCartIcon size={10} /> Import from Cart</Button>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="loanTerm" className='font-semibold'>Down Payment (VNĐ)</Label>
                        <CurrencyInputVietnam className='flex w-full px-3 py-1 text-white transition-colors rounded-md shadow-sm h-9 bg-brand-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' name='downPayment' />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="loanTerm" className='font-semibold'>Loan Term (max 72 months)</Label>
                        <Input
                            id="loanTerm"
                            name="loanTerm"
                            type="number"
                            placeholder="e.g 12, 24, 36, 48, 60, 72"
                            min="1"
                            max="72"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 hover:bg-gradient-to-bl ">Calculate</Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                {result?.error && (
                    <div role="alert" className="alert alert-error">
                        <CircleXIcon />
                        <span>{result.error}</span>
                    </div>
                )}
                {result?.interestRate && result?.monthlyPayment && (
                    <div className="w-full space-y-2">
                        <p className="font-semibold">Results:</p>
                        <p>Interest Rate: {result.interestRate}%</p>
                        <p>Monthly Payment: {formatCurrency(Number(result.monthlyPayment))}</p>
                        <p>Total Payment:  {formatCurrency(Number(result.totalPayment))}</p>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}