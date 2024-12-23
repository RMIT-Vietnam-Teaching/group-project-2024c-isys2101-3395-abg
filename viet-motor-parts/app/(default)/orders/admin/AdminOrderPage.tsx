import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/components/shadcn/table";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next";
import { fetchOrders, Order } from "./fetchOrders";
import CustomPagination from "@/app/components/CustomPagination";


export const metadata: Metadata = {
    title: "Admin Order Management | Viet Motor Parts",
    description: "Admin Order Management",
};


export default async function AdminPage({ searchParams }: { searchParams: Record<string, string> }) {
    let page = parseInt(searchParams.page, 10) || 1;
    page = !page || page < 1 ? 1 : page;
    const ordersData = await fetchOrders(page);
    const orders = ordersData.data;
    const totalPages = ordersData.meta.totalPages;
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const pageNumbers: Number[] = [];
    const offsetNumber = 3;
    for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
        if (i > 0 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }


    return (
        <div className="container mx-auto flex flex-col gap-5">
            <h1 className="text-center text-3xl font-bold">Order Management</h1>
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
                    {orders.map((order: Order) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-bold text-2xl line-clamp-2">
                                <Link href={`/orders/${order._id}`} className="hover:underline max-w-7 overflow-hidden">{order._id}</Link>
                            </TableCell>
                            <TableCell>{order.customer_name}</TableCell>
                            <TableCell>{order.order_status}</TableCell>
                            <TableCell>{order.payment_method} {order.payment_method === "Installment" ? `(${order.installment_details?.loan_term} months)` : ""}</TableCell>
                            <TableCell className="text-right">{formatCurrency(order.total_amount)}</TableCell>
                        </TableRow>))
                    }
                </TableBody>
            </Table>
            <CustomPagination page={page} totalPages={totalPages} pageNumbers={pageNumbers} prevPage={prevPage} nextPage={nextPage} />
        </div>
    );
}