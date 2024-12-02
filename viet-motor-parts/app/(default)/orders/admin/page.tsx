import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/components/shadcn/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/shadcn/pagination";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next";
import { ScrollArea } from "@/app/components/shadcn/scroll-area";


export const metadata: Metadata = {
    title: "Admin Order Management | Viet Motor Parts",
    description: "Admin Order Management",
};


export default function Page() {
    return (
        <div className="container mx-auto flex flex-col gap-5">
            <h1 className="text-center text-3xl font-bold">Order Management</h1>
            <ScrollArea className="w-full h-screen rounded-lg">
                <Table className="p-5 rounded-lg shadow-lg bg-brand-500">
                    <TableHeader className="sticky top-0 bg-brand-500 rounded-t-lg">
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead className="text-right">Total Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-bold text-2xl line-clamp-2">
                                <Link href="/orders/123" className="hover:underline ">#123</Link>
                            </TableCell>
                            <TableCell>Tôn Thất Hữu Luân</TableCell>
                            <TableCell>Confirmed</TableCell>
                            <TableCell>CoD</TableCell>
                            <TableCell className="text-right">{formatCurrency(300000)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold text-2xl line-clamp-2">
                                <Link href="/orders/124" className="hover:underline ">#124</Link>
                            </TableCell>
                            <TableCell>Nguyễn Văn A</TableCell>
                            <TableCell>Processing</TableCell>
                            <TableCell>PayPal</TableCell>
                            <TableCell className="text-right">{formatCurrency(600000)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold text-2xl line-clamp-2">
                                <Link href="/orders/125" className="hover:underline ">#125</Link>
                            </TableCell>
                            <TableCell>Nguyễn Văn B</TableCell>
                            <TableCell>Delivered</TableCell>
                            <TableCell>Installment (72 months)</TableCell>
                            <TableCell className="text-right">{formatCurrency(900000)}</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter className="sticky bottom-0 bg-brand-500">
                        <TableRow>
                            <TableCell colSpan={5} className="">
                                <div className="flex justify-center">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious href="#" />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">1</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#" isActive>
                                                    2
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">3</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext href="#" />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </ScrollArea>
        </div >
    );
}