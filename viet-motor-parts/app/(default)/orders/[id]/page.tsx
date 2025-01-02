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
import { CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";
import fetchOrderbyID, { OrderDetail } from "./fetchOrderbyID";
import { redirect } from "next/navigation";
import { getAuthStatus, getAuthToken } from "@/lib/auth";
import Button from "@/app/components/Button";
import StatusModal from "./changeOrderStatusModal";

export async function generateMetadata({ params }: { params: { id: string } }) {

  return {
    title: `Order ${params.id} | Viet Motor Parts`,
    description: `Order ${params.id} details`,
  };
}

export const STATUSES = [
  { key: "Pending", label: "Pending Approval" },
  { key: "Confirmed", label: "Order Confirmed" },
  { key: "Packaged", label: "Packaged" },
  { key: "Shipped", label: "Shipped" },
  { key: "On The Way", label: "On The Way" },
  { key: "Delivered", label: "Delivered" },
];

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: Record<string, string> }) {
  const isLoggedIn = await getAuthStatus();
  const phoneNumber = searchParams.phone_number || "";
  let order;
  if (phoneNumber) {
    order = await fetchOrderbyID({ id: params.id, phoneNumber });
  } else {
    const token = await getAuthToken();
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

  const getLineClass = (currentStatus: string, activeStatus: string) => {
    const currentIndex = STATUSES.findIndex((status) => status.key === currentStatus);
    const activeIndex = STATUSES.findIndex((status) => status.key === activeStatus);

    return activeIndex >= currentIndex
      ? "bg-green-500"
      : "";
  };

  const getValidStatuses = (currentStatus: string): { key: string; label: string }[] => {
    const getStatusIndex = (key: string): number => STATUSES.findIndex((status) => status.key === key);
    const CANCELED_STATUS = { key: "Cancelled", label: "Cancelled" };

    const currentIndex = getStatusIndex(currentStatus);
    const validStatuses: { key: string; label: string }[] = [];

    // Add the next status if it exists
    if (currentIndex < STATUSES.length - 1) {
      validStatuses.push(STATUSES[currentIndex + 1]);
    }

    // Add "Cancelled" if the current status is less than "Shipped"
    if (currentIndex < getStatusIndex("Shipped")) {
      validStatuses.push(CANCELED_STATUS);
    }

    if (currentStatus === "Cancelled") {
      return [STATUSES[0]];
    }

    // Add "On The Way" if the current status is "Delivered"
    if (currentStatus === "Delivered") {
      validStatuses.push(STATUSES[4]);
    }

    return validStatuses;
  };




  return (
    <div className="container mx-auto">
      <div className="grid items-center justify-center">
        <h1 className="p-5 text-2xl md:text-5xl font-extrabold text-center col-start-2 line-clamp-2">
          #{order._id}
        </h1>
      </div>
      {isLoggedIn ?
        <div className="flex justify-center items-center gap-5">
          <StatusModal order_id={order._id} current_status={STATUS} validStatuses={getValidStatuses(STATUS)} />
          <Button title="Edit Order Details" link={`/orders/${order._id}/edit`} />
        </div> : <></>}
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
        {STATUS === "Cancelled" ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-5 shadow-xl rounded-xl bg-brand-500 text-white">
            <CircleX className="w-16 h-16" color="#ef4444" />
            <h2 className="text-3xl font-bold">Order Cancelled</h2>
            <p className="text-center text-lg">
              This order has been cancelled and will not be processed further.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full shadow-xl rounded-xl bg-brand-500">
            <ul className="timeline timeline-vertical py-5">
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
        )}
        {order.payment_method === "Installment" && order.installment_details && (
          <div className="md:col-span-2 bg-brand-500 rounded-xl shadow-xl py-5">
            <div className="text-center flex flex-col gap-3">
              <h1 className="text-3xl font-extrabold">Installment Details</h1>
              {order.order_status === "Pending" ?
                <h2 className="text-lg font-semibold">Your request is subject to our partner's approval. There may be adjustments to this rate.</h2>
                : <></>}
            </div>
            <div className="grid grid-cols-1 gap-2 px-5 pt-5">
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
          {order.payment_method === "Installment" && order.installment_details ?
            (
              <TableRow>
                <TableCell colSpan={3} className="font-bold">
                  Total (Including Interest)
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(order.installment_details.total_with_interest)}
                </TableCell>
              </TableRow>
            ) : <></>}
        </TableFooter>
      </Table>
    </div >
  );
}
