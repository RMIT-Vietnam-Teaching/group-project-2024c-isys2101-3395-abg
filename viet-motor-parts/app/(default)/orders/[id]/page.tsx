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
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {

  return {
    title: `Order ${params.id} | Viet Motor Parts`,
    description: `Order ${params.id} details`,
  };
}

const STATUSES = [
  { key: "Pending", label: "Pending Approval" },
  { key: "Confirmed", label: "Order Confirmed" },
  { key: "Packaged", label: "Packaged" },
  { key: "Shipped", label: "Shipped" },
  { key: "OnTheWay", label: "On The Way" },
  { key: "Delivered", label: "Delivered" },
];

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: Record<string, string> }) {
  // If the phone number is provided in the query params, use it to fetch the order, else use the auth token in cookie
  const phoneNumber = searchParams.phone_number || "";
  let order;
  if (phoneNumber) {
    order = await fetchOrderbyID({ id: params.id, phoneNumber });
  } else {
    const token = cookies().get('token')?.value;
    if (!token) {
      redirect('/error');
    }
    order = await fetchOrderbyID({ id: params.id, authToken: token });
  }


  const STATUS = order.order_status;

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
            <p className="text-right line-clamp-2">{order.customer_name}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Phone:</p>
            <p className="text-right line-clamp-2">{order.phone_number}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Address:</p>
            <p className="line-clamp-2 text-right">{order.address}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Order Date:</p>
            <p className="text-right line-clamp-2">{new Date(order.created_at).toLocaleDateString("en-GB")}</p>
          </div>
          {order.additional_notes ?
            <div className="flex justify-between">
              <p className="font-semibold">Additional Notes:</p>
              <p className="text-right line-clamp-2">{order.additional_notes}</p>
            </div>
            : <></>
          }
          <div className="flex justify-between">
            <p className="font-semibold">Payment Method:</p>
            <p className="text-right line-clamp-2">{order.payment_method}</p>
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
                <div
                  className={`${getStatusClass(status.key, STATUS)} ${index % 2 === 0 ? "timeline-start" : "timeline-end"
                    }`}
                >
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
        {order.payment_method === "Installment" && order.installment_details && (
          <div className="md:col-span-2 bg-brand-500 rounded-xl shadow-xl py-5">
            <div className="text-center flex flex-col gap-3">
              <h1 className="text-3xl font-extrabold">Installment Details</h1>
              {order.order_status === "Pending" ?
                <h2 className="text-lg font-semibold">Your request is subject to our partner's approval. There may be adjustments to this rate.</h2>
                : <></>}
            </div>
            <div className="grid grid-cols-1 gap-2 px-5">
              <div className="flex justify-between">
                <p className="font-semibold">Down Payment:</p>
                <p>{formatCurrency(order.installment_details.down_payment)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Loan Term:</p>
                <p>{order.installment_details.loan_term} months</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Monthly Payment:</p>
                <p>{formatCurrency(order.installment_details.monthly_payment)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Interest Rate:</p>
                <p>{order.installment_details.interest_rate}%</p>
              </div>
            </div>
          </div>
        )
        }
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
