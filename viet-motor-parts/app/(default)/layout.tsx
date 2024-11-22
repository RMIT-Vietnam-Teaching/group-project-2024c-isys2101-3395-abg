import "@/app/globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-brand-600 text-white">
        <Navbar />
        <div className="flex-grow bg-gradient-to-b from-brand-600 via-brand-500 to-brand-600">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
