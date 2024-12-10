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
import fetchOrderbyID, { OrderDetail } from "./fetchOrderbyID";

export async function generateMetadata({ params }: { params: { id: string } }) {

  return {
    title: `Order ${params.id} | Viet Motor Parts`,
    description: `Order ${params.id} details`,
  };
}

const STATUSES = [
  { key: "Confirmed", label: "Order Confirmed" },
  { key: "Packaged", label: "Packaged" },
  { key: "Shipped", label: "Shipped" },
  { key: "OnTheWay", label: "On The Way" },
  { key: "Delivered", label: "Delivered" },
];

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: Record<string, string> }) {
  const phoneNumber = searchParams.phone_number || "";
  const order = await fetchOrderbyID(params.id, phoneNumber);


  const STATUS = order.order_status || "Confirmed";

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
      <div className="grid  items-center justify-center">
        <h1 className="p-5 text-5xl font-extrabold text-center col-start-2">
          #{order._id}
        </h1>
      </div>
      <div className="flex justify-center">
        <button className="col-start-3 rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl">
          Change Status
        </button>
      </div>
      <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
        <div className="grid w-full h-full grid-cols-1 gap-2 p-6 shadow-xl rounded-xl bg-brand-500">
          <p className="text-2xl font-bold">Order Information</p>
          <div className="flex justify-between">
            <p className="font-semibold">Name:</p>
            <p>{order.customer_name}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Phone:</p>
            <p>{order.phone_number}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Address:</p>
            <p className="line-clamp-1">{order.address}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Order Date:</p>
            <p>{new Date(order.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full shadow-xl rounded-xl bg-brand-500">
          <ul className="timeline timeline-vertical">
            {STATUSES.map((status, index) => (
              <li key={status.key} id={status.key.toLowerCase()}>
                {index > 0 && (
                  <hr
                    className={getLineClass(
                      STATUSES[index - 1].key,
                      STATUS
                    )}
                    id={`${status.key.toLowerCase()}-line-1`}
                  />
                )}
                <div className={getStatusClass(status.key, STATUS)}>
                  {status.label}
                </div>
                <div className="timeline-middle">
                  <CircleCheck
                    className={getCircleClass(status.key, STATUS)}
                    id={`${status.key.toLowerCase()}Circle`}
                  />
                </div>
                {index < STATUSES.length - 1 && (
                  <hr
                    className={getLineClass(status.key, STATUS)}
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
          {order.order_details.map((item: OrderDetail) => (
            <TableRow key={item.product_id}>
              <TableCell className="font-medium line-clamp-2">
                <Link href={`/products/${item.product_id}`} className="hover:underline">
                  {item.product_name}
                </Link>
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.price * item.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-bold">
              Total
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(order.total_amount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
