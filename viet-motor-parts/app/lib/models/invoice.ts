import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Invoice document
export interface IInvoice extends Document {
  order_id: mongoose.Types.ObjectId;
  invoice_date: Date;
  total_amount: number;
  order_reference?: string; // Optional reference for better traceability
  created_at?: Date;
  updated_at?: Date;
}

// Schema Definition
const invoiceSchema: Schema<IInvoice> = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // Link to the Order schema
      required: [true, 'Order ID is required'],
    },
    invoice_date: {
      type: Date,
      required: [true, 'Invoice date is required'],
      default: Date.now,
    },
    total_amount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount must be a positive number'],
    },
    order_reference: {
      type: String, // e.g., a shipping label or unique identifier from the order
      required: false,
      index: true, // Indexed for faster lookups
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Create and Export Invoice Model
const Invoice: Model<IInvoice> = mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', invoiceSchema);
export default Invoice;