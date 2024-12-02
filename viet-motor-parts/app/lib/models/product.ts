import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Product
export interface IProduct extends Document {
  name: string;
  description: string;
  brand: string;
  category_id: mongoose.Types.ObjectId;
  price: number;
  stock_quantity: number;
  image_base64: string;
  compatible_vehicles: Array<{
    make: string;
    model: string;
    year: number;
  }>;
  created_at?: Date;
  updated_at?: Date;
}

// Schema Definition
const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3 },
    description: { type: String, required: true, minLength: 10 },
    brand: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true, min: 0 },
    stock_quantity: { type: Number, required: true, min: 0 },
    image_base64: { type: String, required: true },
    compatible_vehicles: [
      {
        make: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Avoid OverwriteModelError
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
