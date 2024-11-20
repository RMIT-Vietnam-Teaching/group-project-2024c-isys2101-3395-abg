'use client'

import { useState } from 'react'
import { Button } from "../components/shadcn/button"
import { Input } from "../components/shadcn/input"
import { Label } from "../components/shadcn/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/shadcn/card"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/shadcn/alert"
import { AlertCircle } from 'lucide-react'
import CurrencyInputVietnam from '../components/CurrencyInputVietnam'

interface CalculateLoanResult {
    error?: string
    interestRate?: string
    monthlyPayment?: string
    totalPayment?: string
}

export default function CreditScoreForm({ calculateLoan }: { calculateLoan: (formData: FormData) => Promise<CalculateLoanResult> }) {
    const [result, setResult] = useState<CalculateLoanResult | null>(null)

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    async function handleSubmit(formData: FormData) {
        const calculationResult = await calculateLoan(formData)
        setResult(calculationResult)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Credit Score Calculator</CardTitle>
                <CardDescription>Calculate your interest rate and monthly payment based on your credit score and loan term</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="creditScore">Credit Score (300-850)</Label>
                        <Input
                            id="creditScore"
                            name="creditScore"
                            type="number"
                            placeholder="Enter your credit score"
                            min="300"
                            max="850"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="loanTerm">Total Amount (VNĐ)</Label>
                        <CurrencyInputVietnam className='flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="loanTerm">Loan Term (months)</Label>
                        <Input
                            id="loanTerm"
                            name="loanTerm"
                            type="number"
                            placeholder="Enter loan term (max 72 months)"
                            min="1"
                            max="72"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Calculate</Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                {result?.error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{result.error}</AlertDescription>
                    </Alert>
                )}
                {result?.interestRate && result?.monthlyPayment && (
                    <div className="space-y-2 w-full">
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