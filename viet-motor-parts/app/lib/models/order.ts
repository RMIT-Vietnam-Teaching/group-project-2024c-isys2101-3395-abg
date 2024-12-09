import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Order
export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  customer_name: string;
  phone_number: string;
  address: string;
  total_amount: number;
  order_status: 'Pending' | 'Confirmed' | 'Shipping' | 'Delivered' | 'Canceled';
  payment_method: 'Cash' | 'PayPal' | 'Installment';
  shipping_label?: string;
  order_details: Array<{
    product_id: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }>;
  created_at?: Date;
  updated_at?: Date;
}

// Schema Definition
const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    customer_name: { type: String, required: true, minLength: 5 },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    total_amount: { type: Number, required: true, min: 0 },
    order_status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Shipping', 'Delivered', 'Canceled'],
      default: 'Pending',
    },
    payment_method: {
      type: String,
      required: true,
      enum: ['Cash', 'PayPal'],
    },
    shipping_label: { type: String, default: null },
    order_details: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Avoid OverwriteModelError
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;
