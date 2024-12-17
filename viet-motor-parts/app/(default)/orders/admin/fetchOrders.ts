import { cookies } from "next/headers";
import { OrderDetail } from "../[id]/fetchOrderbyID";


export interface Order {
    _id: string;
    customer_name: string;
    phone_number: string;
    address: string;
    total_amount: number;
    order_status: string;
    created_at: string;
    order_details: OrderDetail[];
    additional_notes?: string;
    payment_method: string;
    installment_details?: {
      down_payment: number;
      loan_term: number;
      monthly_payment: number;
      interest_rate: number;
    };
  }

export async function fetchOrders(): Promise<Order[]> {
    try {
        const res = await fetch(`http://localhost:3000/api/orders`, { cache: "no-store", headers : {'authorization' : `Bearer ${cookies().get('token')?.value}`} });
        if (!res.ok) {
            console.error(`Failed to fetch orders, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}