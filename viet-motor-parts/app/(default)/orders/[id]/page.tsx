import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/app/components/shadcn/table";
import { formatCurrency } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next/types";
interface OrderPageProps {
    params: {
        id: string;
    };
}

export const metadata: Metadata = {
    title: "Order Details | Viet Motor Parts",
    description: "Order Details",
};

export default function Page({ params }: OrderPageProps) {
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
                <div className="flex items-center justify-center w-full h-full shadow-xl rounded-xl bg-brand-500">
                    <ul className="timeline timeline-vertical">
                        <li id="orderConfirmed">
                            <div className="bg-green-500 border-none shadow-xl timeline-start timeline-box">Order Confirmed</div>
                            <div className="timeline-middle">
                                <CircleCheck className="w-5 h-5 text-green-500" id="orderConfirmedCircle" />
                            </div>
                            <hr className="bg-green-500" id="orderpackaged-line-1" />
                        </li>
                        <li id="orderPackaged">
                            <hr className="bg-green-500" id="orderpackaged-line-2" />  {/* change line-1 and line-2 when the step is finished */}
                            <div className="bg-green-500 border-none shadow-xl timeline-start timeline-box">Packaged</div>
                            <div className="timeline-middle">
                                <CircleCheck className="w-5 h-5 text-green-500" id="orderPackagedCircle" />
                            </div>
                            <hr className="bg-green-500" id="ordershipped-line-1" />
                        </li>
                        <li id="shipped">
                            <hr className="bg-green-500" id="ordershipped-line-2" />
                            <div className="bg-green-500 border-none shadow-xl timeline-start timeline-box">Shipped</div>
                            <div className="timeline-middle">
                                <CircleCheck className="w-5 h-5 text-green-500" id="orderShippedCircle" />
                            </div>
                            <hr className="" id="orderOnTheWay-line-1" />
                        </li>
                        <li id="onTheWay">
                            <hr className="" id="orderOnTheWay-line-2" />
                            <div className="timeline-middle">
                                <CircleCheck className="w-5 h-5 text-white" id="orderOnTheWay-2" />
                            </div>
                            <div className="border-none shadow-xl timeline-start timeline-box bg-brand-600">On The Way</div>
                            <hr className="" id="orderDelivered-line-1" />
                        </li>
                        <li id="delivered">
                            <hr className="" id="orderdelivered-line-2" />
                            <div className="border-none shadow-xl timeline-start timeline-box bg-brand-600">Delivered</div>
                            <div className="timeline-middle">
                                <CircleCheck className="w-5 h-5 text-white" id="orderDeliveredCircle" />
                            </div>
                        </li>
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
        </div>
    );
}