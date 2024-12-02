import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Category document
export interface ICategory extends Document {
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Schema Definition
const categorySchema: Schema<ICategory> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      minLength: [3, 'Category name must be at least 3 characters long'],
      maxLength: [50, 'Category name cannot exceed 50 characters']
    },
    description: {
      type: String,
      maxLength: [200, 'Description cannot exceed 200 characters']
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

// Create and Export Category Model
const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);
export default Category;