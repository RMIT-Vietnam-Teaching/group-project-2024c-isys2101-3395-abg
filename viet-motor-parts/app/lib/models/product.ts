import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Product document
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
    name: {
      type: String,
      required: [true, 'Product name is required'],
      minLength: [3, 'Product name must be at least 3 characters long']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [10, 'Description must be at least 10 characters long']
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      minLength: [2, 'Brand must be at least 2 characters long']
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category ID is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    stock_quantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock quantity must be a non-negative number']
    },
    image_base64: {
      type: String,
      required: [true, 'Image in Base64 format is required']
    },
    compatible_vehicles: {
      type: [
        {
          make: { type: String, required: [true, 'Vehicle make is required'] },
          model: { type: String, required: [true, 'Vehicle model is required'] },
          year: {
            type: Number,
            required: [true, 'Vehicle year is required'],
            min: [1900, 'Year must be a valid year'],
            max: [new Date().getFullYear(), 'Year cannot be in the future']
          }
        }
      ],
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

// Create and Export Product Model
const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
export default Product;
