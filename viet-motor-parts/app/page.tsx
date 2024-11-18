import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Homepage | Viet Motor Parts",
    description: "Homepage of Viet Motor Parts",
};

export default function Home() {
    return (
        <div className="container h-full">
            <h1 className="text-4xl font-bold">Welcome to DaisyUI</h1>
            <p className="text-lg mt-4">
                DaisyUI is a CSS framework that is designed to be simple and lightweight.
                It is built on top of Tailwind CSS and provides a set of components that
                are easy to use and customize.
            </p>
        </div>
    );
}
