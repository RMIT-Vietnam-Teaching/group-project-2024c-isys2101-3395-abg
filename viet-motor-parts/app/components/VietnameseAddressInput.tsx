
import { Label } from "./shadcn/label";
import { Input } from "./shadcn/input";
import { Select, SelectTrigger, SelectValue } from "./shadcn/select";

export default function VietnameseAddressInput() {


    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
                <Label htmlFor="city" className="font-bold">City</Label>
                <Input type="text" id="city" name="city" className="w-full p-2" placeholder="e.g. Ho Chi Minh" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="district" className="font-bold">District</Label>
                <Input type="text" id="district" name="district" className="w-full p-2" placeholder="e.g. Quận 7" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="ward" className="font-bold">Ward</Label>
                <Input type="text" id="ward" name="ward" className="w-full p-2" placeholder="e.g. Tân Hưng" />
            </div>
        </div>
    );
}