import "@/app/globals.css";
import React from "react";
import { Footer } from "../components/Footer";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="flex flex-col bg-brand-600 text-white h-screen">
                <div className="bg-gradient-to-b from-brand-600 via-brand-500 to-brand-600">{children}</div>
                <Footer />
            </body>
        </html>
    );
}
