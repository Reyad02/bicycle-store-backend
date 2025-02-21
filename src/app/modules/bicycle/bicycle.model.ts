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
    image: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    seatpost: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    torque: {
      type: Number,
      required: true,
    },
    frameSize: {
      type: Number,
      required: true,
    },
    chain: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Bicycle = model<Ibicycle>('Bicycle', bicycleSchema);
export default Bicycle;
