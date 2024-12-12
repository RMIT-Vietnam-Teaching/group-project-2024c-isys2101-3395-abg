import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Order
export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  customer_name: string;
  email: string;
  phone_number: string;
  address: string;
  total_amount: number;
  order_status: 'Pending' | 'Confirmed' | 'Shipping' | 'Delivered' | 'Canceled';
  payment_method: 'Cash' | 'PayPal' | 'Installment';
  additional_notes?: string;
  shipping_label?: string;
  order_details: Array<{
    product_id: mongoose.Types.ObjectId;
    product_name: string; // Add product_name here
    quantity: number;
    price: number;
  }>;
  installment_details?: {
    down_payment: number;
    loan_term: number;
    monthly_payment: number;
    interest_rate: number;
  };
  created_at?: Date;
  updated_at?: Date;
}

// Schema Definition
const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    customer_name: { type: String, required: true, minLength: 5 },
    email: { type: String, required: true }, // Email field added
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    total_amount: { type: Number, required: true, min: 0 },
    additional_notes: { type: String, default: null }, // Notes field added
    order_status: {
      type: String,
      required: true,
      enum: ['Confirmed', 'Shipping', 'Delivered', 'Canceled'],
      default: 'Confirmed',
    },
    payment_method: {
      type: String,
      required: true,
      enum: ['Cash', 'PayPal', 'Installment'],
    },
    shipping_label: { type: String, default: null },
    order_details: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        product_name: { type: String, required: true }, // Add product_name field here
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    installment_details: {
      down_payment: { type: Number, required: function () { return this.payment_method === 'Installment'; }, min: 0 },
      loan_term: { type: Number, required: function () { return this.payment_method === 'Installment'; }, min: 1 },
      monthly_payment: { type: Number, required: function () { return this.payment_method === 'Installment'; }, min: 0 },
      interest_rate: { type: Number, required: function () { return this.payment_method === 'Installment'; }, min: 0 },
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Avoid OverwriteModelError
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;
