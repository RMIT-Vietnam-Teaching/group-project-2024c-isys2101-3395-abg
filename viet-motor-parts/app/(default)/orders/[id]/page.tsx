import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/app/components/shadcn/table";
import { formatCurrency } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
interface OrderPageProps {
    params: {
        id: string;
    };
}
export async function generateMetadata({ params }: OrderPageProps) {
    return {
        title: `Order #${params.id} | Viet Motor Parts`,
        description: `Order #${params.id} details`,
    }
}
const STATUSES = [
    { key: "Confirmed", label: "Order Confirmed" },
    { key: "Packaged", label: "Packaged" },
    { key: "Shipped", label: "Shipped" },
    { key: "OnTheWay", label: "On The Way" },
    { key: "Delivered", label: "Delivered" },
];


export default function Page({ params }: OrderPageProps) {
    let STATUS: string = 'Confirmed';
    const getStatusClass = (currentStatus: string, activeStatus: string) =>
        STATUSES.findIndex((status) => status.key === activeStatus) >=
            STATUSES.findIndex((status) => status.key === currentStatus)
            ? "bg-green-500 border-none shadow-xl timeline-start timeline-box"
            : "border-none shadow-xl timeline-start timeline-box bg-brand-600";

    const getCircleClass = (currentStatus: string, activeStatus: string) =>
        STATUSES.findIndex((status) => status.key === activeStatus) >=
            STATUSES.findIndex((status) => status.key === currentStatus)
            ? "w-5 h-5 text-green-500"
            : "";

    const getLineClass = (currentStatus: string, activeStatus: string) =>
        STATUSES.findIndex((status) => status.key === activeStatus) >
            STATUSES.findIndex((status) => status.key === currentStatus)
            ? "bg-green-500"
            : "";
    return (
        <div className="container mx-auto">
            <h1 className="p-5 text-5xl font-bold text-center">Order #{params.id}</h1>
            <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
                <div className="grid w-full h-full grid-cols-1 gap-2 p-6 shadow-xl rounded-xl bg-brand-500">
                    <p className="text-2xl font-extrabold">Order Information</p>
                    <div className="flex justify-between">
                        <p className="font-semibold">Name:</p>
                        <p>Tôn Thất Hữu Luân</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Phone:</p>
                        <p>0987654321</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Email:</p>
                        <p>chelseafc6170@gmail.com</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Address:</p>
                        <p className="line-clamp-1">29/84/6 Đoàn Thị Điểm P.1 Q.Phú Nhuận</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Order Date:</p>
                        <p>21/11/2024</p>
                    </div>
                </div>
                {/* Timeline */}
                <div className="flex items-center justify-center w-full h-full shadow-xl rounded-xl bg-brand-500">
                    <ul className="timeline timeline-vertical">
                        {STATUSES.map((status, index) => (
                            <li key={status.key} id={status.key.toLowerCase()}>
                                {/* Line above the box */}
                                {index > 0 && (
                                    <hr
                                        className={getLineClass(
                                            STATUSES[index - 1].key,
                                            STATUS
                                        )}
                                        id={`${status.key.toLowerCase()}-line-1`}
                                    />
                                )}

                                {/* Timeline Box */}
                                <div
                                    className={getStatusClass(status.key, STATUS)}
                                >
                                    {status.label}
                                </div>

                                {/* Middle Circle */}
                                <div className="timeline-middle">
                                    <CircleCheck
                                        className={getCircleClass(status.key, STATUS)}
                                        id={`${status.key.toLowerCase()}Circle`}
                                    />
                                </div>

                                {/* Line below the box */}
                                {index < STATUSES.length - 1 && (
                                    <hr
                                        className={getLineClass(
                                            status.key,
                                            STATUS
                                        )}
                                        id={`${status.key.toLowerCase()}-line-2`}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Table className="p-5 rounded-lg shadow-lg bg-brand-500">
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Price per SKU</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium line-clamp-2">
                            <Link href="/products" className="hover:underline">Đèn led 2 tầng Zhi.Pat phiên bản Sportline</Link>
                        </TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>{formatCurrency(300000)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(600000)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium line-clamp-2">
                            <Link href="/products" className="hover:underline">Phuộc Profender Max Series</Link>
                        </TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>{formatCurrency(300000)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(300000)}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="font-bold">Total</TableCell>
                        <TableCell className="text-right">{formatCurrency(900000)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div >
    );
}