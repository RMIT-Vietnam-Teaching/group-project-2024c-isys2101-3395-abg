"use client"

import { useState } from 'react'
import { calculateLoan, LoanCalculationResult } from '../calculator/calculation';
import { Label } from '@/app/components/shadcn/label';
import { Input } from '@/app/components/shadcn/input';
import { Button } from '@/app/components/shadcn/button';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/shadcn/alert';
import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';


export default function PaymentMethod() {
    const total = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('total');
        }
    }
    const [result, setResult] = useState<LoanCalculationResult | null>(null);
    const [isInstallment, setIsInstallment] = useState(false);

    async function handleSubmit(formData: FormData) {
        const calculationResult = await calculateLoan(formData)
        setResult(calculationResult)
    }

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsInstallment(event.target.value === 'installment');
    };



    return (
        <div className="bg-brand-600 rounded-xl">
            <h1 className="p-5 text-2xl font-bold">Payment Method</h1>
            <div className="flex flex-col gap-5 px-5">
                <div className="flex items-center ps-4 bg-brand-400 rounded-2xl">
                    <input id="PayPal" type="radio" value="Paypal" name="paymentMethod" className="w-4 h-4 accent-brand-200" onChange={handlePaymentMethodChange}>
                    </input>
                    <label htmlFor="PayPal" className="w-full py-4 font-semibold text-white ms-2 text-md">PayPal</label>
                </div>
                <div className="flex items-center ps-4 bg-brand-400 rounded-2xl">
                    <input id="CoD" type="radio" value="Cash" name="paymentMethod" className="w-4 h-4 accent-brand-200" onChange={handlePaymentMethodChange}>
                    </input>
                    <label htmlFor="CoD" className="w-full py-4 font-semibold text-white ms-2 text-md">Cash on Delivery</label>
                </div>
                <div className="flex items-center ps-4 bg-brand-400 rounded-2xl">
                    <input id="installment" type="radio" value="installment" name="paymentMethod" className="w-4 h-4 accent-brand-200" onChange={handlePaymentMethodChange}>
                    </input>
                    <label htmlFor="installment" className="w-full py-4 font-semibold text-white ms-2 text-md">Buy Now, Pay Later</label>
                </div>
                {isInstallment ?
                    <div>
                        <form action={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="creditScore" className='font-semibold'>Credit Score (300-850)</Label>
                                <Input
                                    id="creditScore"
                                    name="creditScore"
                                    type="number"
                                    placeholder="e.g 300, 450, 600, 750, 850"
                                    min="300"
                                    max="850"
                                    required
                                />
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
                            </div>
                        )}
                    </div>
                    : null}
            </div>
        </div>
    );
}