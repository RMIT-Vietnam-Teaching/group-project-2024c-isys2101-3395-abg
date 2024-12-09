"use server"

export type LoanCalculationResult =
    | { error: string; interestRate?: undefined; monthlyPayment?: undefined; totalPayment?: undefined; }
    | { interestRate: string; monthlyPayment: string; totalPayment: string; error?: undefined; };

    export async function calculateLoan(formData: FormData): Promise<LoanCalculationResult> {
        const totalPrice = Number(formData.get('price'));
        const downPayment = Number(formData.get('downPayment'));
        const loanTerm = Number(formData.get('loanTerm'));
    
        if (isNaN(totalPrice) || totalPrice <= 0) {
            return { error: 'Total price must be a positive number' };
        }
    
        if (isNaN(downPayment) || downPayment < 0 || downPayment > totalPrice) {
            return { error: 'Down payment must be a positive number less than the total price' };
        }
    
        if (isNaN(loanTerm) || loanTerm < 1 || loanTerm > 72) {
            return { error: 'Loan term must be between 1 and 72 months' };
        }
    
        const interestRate = await calculateInterestRate(loanTerm, downPayment, totalPrice);
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm;
        const loanAmount = totalPrice - downPayment;
        const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const totalPayment = monthlyPayment * numberOfPayments;
    
        return {
            interestRate: interestRate.toFixed(2),
            monthlyPayment: monthlyPayment.toFixed(2),
            totalPayment: totalPayment.toFixed(2)
        };
    }


    export async function calculateInterestRate(term: number, downPayment: number, totalPrice: number): Promise<number> {
        let baseRate = 8.0; // Average lending rate for financing motorcycle parts
    
        // Calculate the down payment percentage
        const downPaymentPercentage = (downPayment / totalPrice) * 100;
    
        // Granular adjustments based on loan term
        if (term <= 12) baseRate -= 1.0; // Discount for very short terms
        else if (term > 12 && term <= 24) baseRate -= 0.5; // Small discount for short terms
        else if (term > 24 && term <= 36) baseRate -= 0.25; // Slight discount for medium-short terms
        else if (term > 36 && term <= 48) baseRate += 0.25; // Small increase for medium terms
        else if (term > 48 && term <= 60) baseRate += 0.5; // Moderate increase for longer terms
        else if (term > 60 && term <= 72) baseRate += 0.75; // Higher rate for the longest term
    
        // Adjust interest rate based on down payment percentage
        if (downPaymentPercentage >= 50) baseRate -= 1.0; // Significant discount for very high down payment
        else if (downPaymentPercentage >= 30) baseRate -= 0.5; // Moderate discount for high down payment
        else if (downPaymentPercentage >= 10) baseRate -= 0.25; // Small discount for decent down payment
        else baseRate += 0.25; // Slight penalty for low down payment
    
        // Ensure the interest rate is within a realistic range
        return Math.min(Math.max(baseRate, 6.0), 12.0); // Rate bounded between 6% and 12%
    }
