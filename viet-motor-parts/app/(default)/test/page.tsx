"use client";

import CompatibleVehicle from "@/app/components/CompatibleVehicle";
import ProductDialog from "@/app/components/ProductDialog";
import React from "react";

export default function Page() {
    const [selectedVehicles, setSelectedVehicles] = React.useState<{ id: number, name: string }[]>([]);
    return (
        <div>
            <h1 className="text-center text-5xl font-bold p-5">Page for Component Testing</h1>
            <ProductDialog />
        </div>
    );
}