import mongoose, { Schema, Document, Model } from 'mongoose';
import { valid_phone_number, valid_address } from '../utils';

// Interface for the Customer document
export interface ICustomer extends Document {
  name: string;
  address: string;
  phone_number: string;
  created_at?: Date;
  updated_at?: Date;
}

// Schema Definition
const customerSchema: Schema<ICustomer> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      minLength: [5, 'Customer name must be at least 5 characters long']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      validate: {
        validator: valid_address,
        message: (props: { value: string }) => `${props.value} is not a valid address!`,
    },
    },
    phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: valid_phone_number,
        message: props => `${props.value} is not a valid phone number!`
      }
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

// Create and Export Customer Model
const Customer: Model<ICustomer> = mongoose.model<ICustomer>('Customer', customerSchema);
export default Customer;