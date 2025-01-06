import { redirect } from "next/navigation";
import { Order } from "../admin/fetchOrders";

export interface OrderDetail {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }



interface fetchOrderProps {
    id: string;
    phoneNumber?: string;
    authToken?: string;
}

export default async function fetchOrderbyID({ id, phoneNumber, authToken }: fetchOrderProps): Promise<Order> {
  const headers: HeadersInit = {};

  if (phoneNumber) {
    headers['phone_number'] = phoneNumber;
  }

  if (authToken) {
    headers['authorization'] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
      headers,
    });

    if (!response.ok) {
      console.error("Error fetching order:", response.statusText);
      redirect('/error');
    }

    const data = await response.json();
    console.log("Order data:", data); // Debug to confirm `paypal_order_id`
    return data.data;
  } catch (error) {
    console.error("Fetch error:", error);
    redirect('/error');
  }
}
