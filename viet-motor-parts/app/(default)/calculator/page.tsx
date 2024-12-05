import { calculateLoan } from './calculation';
import CreditScoreForm from './clientComponent'
import { Metadata } from "next/types";


export const metadata: Metadata = {
    title: "Interest Rate Calculator | Viet Motor Parts",
    description: "Viet Motor Part's Interest Rate Calculator",
};


export default function CreditScoreCalculator() {
    return (
        <div className='pt-[72px]'>
            <CreditScoreForm calculateLoan={calculateLoan} />
        </div>
    );
}