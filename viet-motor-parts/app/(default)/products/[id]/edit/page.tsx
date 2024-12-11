import ProductEditForm from "./ProductEditForm";
import { fetchProductbyID } from "../fetchProductbyID";
import { fetchVehiclebyID } from "@/app/(default)/vehicles/[id]/fetchVehiclebyID";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const res = await fetchProductbyID(params.id);

    return {
        title: `${res.name} Edit | Viet Motor Parts`,
        description: `Edit ${res.name} details`,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const product = await fetchProductbyID(params.id);
    const compatibleVehicles = await Promise.all(product.compatible_vehicles.map((vehicleID) => {
        return fetchVehiclebyID(vehicleID);
    }));
    return (
        <div className="container mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-5xl font-bold">Edit {product.name}</h1>
            <ProductEditForm product={product} compatibleVehicles={compatibleVehicles} />
        </div>
    );
}