"use client";

import { getProductImage } from "@/lib/utils";
import React, { useState, ChangeEvent } from "react";

type ImageInputProps = {
  defaultBase64?: string;
  onImageChange?: (base64: string) => void;
};

export default function ImageInput({ defaultBase64 = "", onImageChange }: ImageInputProps) {
  const [preview, setPreview] = useState(defaultBase64);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        if (onImageChange) {
          onImageChange(base64String.replace(/^data:image\/[a-z]+;base64,/, ""));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {preview ? (
        <img src={getProductImage(preview)} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
      ) : (
        <div className="h-32 w-32 bg-gray-200 rounded-lg flex items-center justify-center">
          No image provided
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
}
