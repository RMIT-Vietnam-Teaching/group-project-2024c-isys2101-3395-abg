import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for CompatibleVehicle
export interface ICompatibleVehicle extends Document {
  make: string;
  vehicleModel: string;
  year: number;
  created_at?: Date;
  updated_at?: Date;
}

// Schema Definition
const compatibleVehicleSchema: Schema<ICompatibleVehicle> = new mongoose.Schema(
  {
    make: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    year: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Avoid OverwriteModelError
const CompatibleVehicle: Model<ICompatibleVehicle> =
  mongoose.models.CompatibleVehicle || mongoose.model<ICompatibleVehicle>('CompatibleVehicle', compatibleVehicleSchema);

export default CompatibleVehicle;
