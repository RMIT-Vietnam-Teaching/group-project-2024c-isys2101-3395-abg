import "@/app/globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import React from "react";
import dynamic from "next/dynamic";


const ToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false }
);
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-brand-600 text-white">
        <Navbar />
        <div className="flex-grow bg-gradient-to-b from-brand-600 via-brand-500 to-brand-600">{children}</div>
        <ToastContainer position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          limit={3}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
        <Footer />
      </body>
    </html>
  );
}
