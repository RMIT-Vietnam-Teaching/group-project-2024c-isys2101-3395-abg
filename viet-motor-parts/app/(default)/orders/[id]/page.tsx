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
interface OrderPageProps {
    params: {
        id: string;
    };
}

export default function Page({ params }: OrderPageProps) {
    return (
        <div className="container mx-auto">
            <h1 className="text-center text-5xl font-bold p-5">Order #{params.id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-5">
                <div className="grid grid-cols-1 gap-2 w-full h-full shadow-xl rounded-xl bg-brand-500 p-6">
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
                            <div className="timeline-start timeline-box bg-green-500 border-none shadow-xl">Order Confirmed</div>
                            <div className="timeline-middle">
                                <CircleCheck className="text-green-500 h-5 w-5" id="orderConfirmedCircle" />
                            </div>
                            <hr className="bg-green-500" id="orderpackaged-line-1" />
                        </li>
                        <li id="orderPackaged">
                            <hr className="bg-green-500" id="orderpackaged-line-2" />  {/* change line-1 and line-2 when the step is finished */}
                            <div className="timeline-start timeline-box bg-green-500 border-none shadow-xl">Packaged</div>
                            <div className="timeline-middle">
                                <CircleCheck className="text-green-500 h-5 w-5" id="orderPackagedCircle" />
                            </div>
                            <hr className="bg-green-500" id="ordershipped-line-1" />
                        </li>
                        <li id="shipped">
                            <hr className="bg-green-500" id="ordershipped-line-2" />
                            <div className="timeline-start timeline-box bg-green-500 border-none shadow-xl">Shipped</div>
                            <div className="timeline-middle">
                                <CircleCheck className="text-green-500 h-5 w-5" id="orderShippedCircle" />
                            </div>
                            <hr className="" id="orderOnTheWay-line-1" />
                        </li>
                        <li id="onTheWay">
                            <hr className="" id="orderOnTheWay-line-2" />
                            <div className="timeline-middle">
                                <CircleCheck className="text-white h-5 w-5" id="orderOnTheWay-2" />
                            </div>
                            <div className="timeline-start timeline-box bg-brand-600 border-none shadow-xl">On The Way</div>
                            <hr className="" id="orderDelivered-line-1" />
                        </li>
                        <li id="delivered">
                            <hr className="" id="orderdelivered-line-2" />
                            <div className="timeline-start timeline-box bg-brand-600 border-none shadow-xl">Delivered</div>
                            <div className="timeline-middle">
                                <CircleCheck className="text-white h-5 w-5" id="orderDeliveredCircle" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <Table className="bg-brand-500 rounded-lg p-5 shadow-lg">
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