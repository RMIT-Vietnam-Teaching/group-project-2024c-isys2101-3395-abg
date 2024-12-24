import { cookies } from "next/headers";
import { OrderDetail } from "../[id]/fetchOrderbyID";
import { getAuthToken } from "@/lib/auth";


export interface Order {
    _id: string;
    customer_name: string;
    email : string;
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
      total_with_interest: number;
    };
  }

export async function fetchOrders({ searchParams }: { searchParams: Record<string, string> }): Promise<{ data: Order[], meta: { totalItems: number, totalPages: number } }> {
    const token = await getAuthToken();
    let page = parseInt(searchParams.page, 10) || 1;
    try {
        const res = await fetch(`http://localhost:3000/api/orders?page=${page}`, 
        { cache: "no-store", 
            headers : {
            'authorization' : `Bearer ${token}`} 
        });
        if (!res.ok) {
            console.error(`Failed to fetch orders, Status: ${res.status}`);
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}