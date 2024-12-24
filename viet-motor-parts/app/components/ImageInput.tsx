"use client";

import React, { useState, ChangeEvent } from "react";

type ClientImageInputProps = {
  name: string; // Name attribute for the hidden input
  defaultValue?: string;
};

export default function ClientImageInput({ name, defaultValue }: ClientImageInputProps) {
  const sanitizeBase64 = (base64: string) => {
    return base64.replace(/^data:image\/[a-z]+;base64,/, "");
  };

  const [preview, setPreview] = useState(defaultValue || "");
  const [base64String, setBase64String] = useState(defaultValue ? sanitizeBase64(defaultValue) : "");



  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setBase64String(sanitizeBase64(base64));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {preview ? (
        <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
      ) : (
        <div className="h-32 w-32 bg-brand-600 rounded-lg flex items-center justify-center">
          <p className="text-center font-bold">No image provided</p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        onChange={handleImageChange}
      />
      {/* Hidden input field to pass Base64 string back to the server */}
      <input type="hidden" name={name} value={base64String} />
    </div>
  );
}
