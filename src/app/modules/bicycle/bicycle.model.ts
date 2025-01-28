import { model, Schema } from 'mongoose';
import Ibicycle from './bicycle.interface';

const bicycleSchema = new Schema<Ibicycle>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number or zero'],
    },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a non-negative integer'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Bicycle = model<Ibicycle>('Bicycle', bicycleSchema);
export default Bicycle;
