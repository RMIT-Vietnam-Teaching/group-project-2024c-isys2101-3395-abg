import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Invoice document
export interface IInvoice extends Document {
  order_id: mongoose.Types.ObjectId;
  invoice_date: Date;
  total_amount: number;
  created_at?: Date;
  updated_at?: Date;
}

// Schema Definition
const invoiceSchema: Schema<IInvoice> = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order ID is required']
    },
    invoice_date: {
      type: Date,
      required: [true, 'Invoice date is required'],
      default: Date.now
    },
    total_amount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount must be a positive number']
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

// Create and Export Invoice Model
const Invoice: Model<IInvoice> = mongoose.model<IInvoice>('Invoice', invoiceSchema);
export default Invoice;