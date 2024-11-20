import Link from "next/link"
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  title: string;
  className?: string;
}

export default function Button({ title, className }: ButtonProps) {
  return (<button
    className={twMerge("rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl", className)}
  >
    {title}
  </button>)
}