import { cookies } from "next/headers";
import { OrderDetail } from "../[id]/fetchOrderbyID";


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

export async function fetchOrders(page: number,
    status: string,
    sortBy: string,
    order: string,
    priceFrom: string,
    priceTo: string)
: Promise<{ data: Order[], meta: { totalItems: number, totalPages: number } }> {
    // Construct API URL dynamically
    let apiUrl = `http://localhost:3000/api/orders?page=${page}`;
    if (status) {
        apiUrl += `&status=${encodeURIComponent(status)}`;
    }
    if (sortBy) {
        apiUrl += `&sortBy=${encodeURIComponent(sortBy)}`;
    }
    if (order) {
        apiUrl += `&order=${encodeURIComponent(order)}`;
    }
    if (priceFrom) {
        apiUrl += `&priceFrom=${encodeURIComponent(priceFrom)}`;
    }
    if (priceTo) {
        apiUrl += `&priceTo=${encodeURIComponent(priceTo)}`;
    }
    try {
        const res = await fetch(`http://localhost:3000/api/orders?page=${page}`, { cache: "no-store", headers : {'authorization' : `Bearer ${cookies().get('token')?.value}`} });
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