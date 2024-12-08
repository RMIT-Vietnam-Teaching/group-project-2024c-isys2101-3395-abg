import CompatabilityCheckPage from "@/app/components/CompatibilityCheckPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Part Compatability Check | Viet Motor Parts",
    description: "Part Compatability Check page",
};


export default function Page() {
    return (
        <CompatabilityCheckPage/>
    );
}
