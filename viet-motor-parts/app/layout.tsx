import type {Metadata} from "next";
import "./globals.css";
import {Navbar} from "@/app/components/Navbar";
import {Footer} from "@/app/components/Footer";



export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body
            className="bg-brand-200  text-white min-h-screen flex flex-col">
        <Navbar/>
        <div className="flex-grow p-3">
            {children}
        </div>
        <Footer/>
        </body>
        </html>
    );
}
