'use client'

import { useState } from 'react'
import { LoanCalculationResult } from '../calculator/calculation';
import { Label } from '@/app/components/shadcn/label';
import { Input } from '@/app/components/shadcn/input';
import { Button } from '@/app/components/shadcn/button';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/shadcn/alert';
import { AlertCircle, TriangleAlert } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import CurrencyInputVietnam from '@/app/components/CurrencyInputVietnam';


export default function PaymentMethod({ calculateLoan }: { calculateLoan: (formData: FormData) => Promise<LoanCalculationResult> }) {
    const total = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('total');
        }
    }
    const [result, setResult] = useState<LoanCalculationResult | null>(null);
    const [isInstallment, setIsInstallment] = useState(false);

    async function handleCalculation(formData: FormData) {
        const calculationResult = await calculateLoan(formData)
        setResult(calculationResult)
    }

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "Installment") {
            setIsInstallment(true)
        } else {
            setIsInstallment(false)
            setResult(null)
        }
    };



    return (
        <div className="bg-brand-600 rounded-xl">
            <h1 className="p-5 text-2xl font-bold">Payment Method</h1>
            <div className="flex flex-col gap-5 px-5">
                <div className="flex items-center ps-4 bg-brand-400 rounded-2xl">
                    <input id="PayPal" type="radio" value="Paypal" name="paymentMethod" className="w-4 h-4 accent-brand-200" onChange={handlePaymentMethodChange} form='checkout'>
                    </input>
                    <label htmlFor="PayPal" className="w-full py-4 font-semibold text-white ms-2 text-md">PayPal</label>
                </div>
                <div className="flex items-center ps-4 bg-brand-400 rounded-2xl">
                    <input id="CoD" type="radio" value="Cash" name="paymentMethod" className="w-4 h-4 accent-brand-200" onChange={handlePaymentMethodChange} form='checkout'>
                    </input>
                    <label htmlFor="CoD" className="w-full py-4 font-semibold text-white ms-2 text-md">Cash on Delivery</label>
                </div>
                <div className="flex items-center ps-4 bg-brand-400 rounded-2xl">
                    <input id="installment" type="radio" value="Installment" name="paymentMethod" className="w-4 h-4 accent-brand-200" onChange={handlePaymentMethodChange} form='checkout'>
                    </input>
                    <label htmlFor="installment" className="w-full py-4 font-semibold text-white ms-2 text-md">Buy Now, Pay Later</label>
                </div>
                {isInstallment ?
                    <div>
                        <form action={handleCalculation} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="loanTerm" className='font-semibold'>Down Payment (VNĐ)</Label>
                                <CurrencyInputVietnam className='flex w-full px-3 py-1 text-white transition-colors rounded-md shadow-sm h-9 bg-brand-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' name='downPayment' />
                            </div>
                            <input type="number" id='price' name='price' hidden defaultValue={total() || ''} />
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
                        {result?.error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="w-4 h-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{result.error}</AlertDescription>
                            </Alert>
                        )}
                        {result?.interestRate && result?.monthlyPayment && (
                            <div className="w-full space-y-2">
                                <p className="font-semibold">Results:</p>
                                <p>Interest Rate: {result.interestRate}%</p>
                                <p>Monthly Payment: {formatCurrency(Number(result.monthlyPayment))}</p>
                                <p>Total Payment:  {formatCurrency(Number(result.totalPayment))}</p>
                                <input type="text" id="installmentTotal" name="installmentTotal" value={Math.round(Number(result.totalPayment))} form='checkout' hidden />
                                <div role="alert" className="alert alert-warning">
                                    <TriangleAlert />
                                    <span>Your new total will be updated to the Total Payment above if you choose the Buy Now, Pay Later option</span>
                                </div>
                            </div>
                        )}
                    </div>
                    : null}
            </div>
        </div>
    );
}