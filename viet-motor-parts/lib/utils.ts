import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

export function getProductImage(imageBase64: string) {
  const isBase64JPEG = imageBase64 && imageBase64.startsWith("/9j/");
  return isBase64JPEG
      ? `data:image/jpeg;base64,${imageBase64}`
      : "/ProductPlaceholder.webp";
}
