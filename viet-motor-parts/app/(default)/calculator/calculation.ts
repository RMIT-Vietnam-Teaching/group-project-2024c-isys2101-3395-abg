"use server"

export type LoanCalculationResult =
    | { error: string; interestRate?: undefined; monthlyPayment?: undefined; totalPayment?: undefined; }
    | { interestRate: string; monthlyPayment: string; totalPayment: string; error?: undefined; };

export async function calculateLoan(formData: FormData): Promise<LoanCalculationResult> {
    const creditScore = Number(formData.get('creditScore'))
    const totalPrice = Number(formData.get('price'))
    const loanTerm = Number(formData.get('loanTerm'))

    if (isNaN(creditScore) || creditScore < 300 || creditScore > 850) {
        return { error: 'Credit score must be between 300 and 850' }
    }

    if (isNaN(totalPrice) || totalPrice <= 0) {
        return { error: 'Total price must be a positive number' }
    }

    if (isNaN(loanTerm) || loanTerm < 1 || loanTerm > 72) {
        return { error: 'Loan term must be between 1 and 72 months' }
    }

    const interestRate = await calculateInterestRate(creditScore, loanTerm)
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm
    const monthlyPayment = (totalPrice * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    const totalPayment = monthlyPayment * numberOfPayments

    return {
        interestRate: interestRate.toFixed(2),
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2)
    }
}


export async function calculateInterestRate(score: number, term: number) {
    let baseRate = 5.5
    if (score >= 800) baseRate = 3.0
    else if (score >= 750) baseRate = 3.5
    else if (score >= 700) baseRate = 4.0
    else if (score >= 650) baseRate = 4.5
    else if (score >= 600) baseRate = 5.0

    // Adjust rate based on loan term
    if (term <= 36) baseRate -= 0.5
    else if (term >= 60) baseRate += 0.5

    return Math.max(baseRate, 2.5) // Ensure the rate doesn't go below 2.5%
}