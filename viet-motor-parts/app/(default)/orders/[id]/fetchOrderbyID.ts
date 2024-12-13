import { redirect } from "next/navigation";

export interface OrderDetail {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }

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

export default async function fetchOrderbyID(id: string, phoneNumber: string) : Promise<Order>{
    const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        headers: { phone_number: phoneNumber }
      });
      if (!response.ok) {
        redirect('/error');
      }
      const data = await response.json();
return data.data;
}