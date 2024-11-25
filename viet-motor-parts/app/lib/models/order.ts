import mongoose, { Schema, Document, Model } from 'mongoose';
import { valid_phone_number, valid_address, valid_email } from '../utils';

// Interface for the Order document
export interface IOrder extends Document {
  customer_name: string;
  phone_number: string;
  address: string;
  email: string;
  additional_info?: string;
  total_amount: number;
  order_status: 'Pending' | 'Confirmed' | 'Shipping' | 'Delivered' | 'Canceled';
  payment_method: 'Cash' | 'PayPal';
  shipping_label?: string;
  order_details: Array<{
    product_id: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }>;
}

// Schema Definition
const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: [true, 'Customer name is required'],
      minLength: [5, 'Customer name must be at least 5 characters long'],
    },
    phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: valid_phone_number,
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      validate: {
        validator: valid_address,
        message: (props) => `${props.value} is not a valid address!`,
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: valid_email,
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    additional_info: {
      type: String,
      default: null, // Default value for optional field
    },
    total_amount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount must be a positive number'],
    },
    order_status: {
      type: String,
      required: [true, 'Order status is required'],
      enum: {
        values: ['Pending', 'Confirmed', 'Shipping', 'Delivered', 'Canceled'],
        message: 'Order status "{VALUE}" is not supported',
      },
      default: 'Pending',
    },
    payment_method: {
      type: String,
      required: [true, 'Payment method is required'],
      enum: {
        values: ['Cash', 'PayPal'],
        message: 'Payment method "{VALUE}" is not supported',
      },
    },
    shipping_label: {
      type: String,
      default: null, // Default value for optional field
    },
    order_details: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product ID is required'],
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity is required'],
          min: [1, 'Quantity must be at least 1'],
        },
        price: {
          type: Number,
          required: [true, 'Price is required'],
          min: [0, 'Price must be a positive number'],
        },
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Create and Export Order Model
const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
