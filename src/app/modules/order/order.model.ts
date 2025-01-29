import { model, Schema } from 'mongoose';
import IOrder from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      required: true,
    },
    totalPrice: {
      type: Number,
      min: [0, 'Total Price must be a positive number or zero'],
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Unpaid'],
      required: true,
    },
    items: [
      {
        bicycle: {
          type: Schema.Types.ObjectId,
          ref: 'Bicycle',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [0, 'Quantity must be a positive number or zero'],
        },
      },
    ],
  },
  { timestamps: true },
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
