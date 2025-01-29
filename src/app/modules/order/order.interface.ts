import { Types } from 'mongoose';

interface IOrder {
  user: Types.ObjectId | string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalPrice?: number;
  paymentStatus: 'Paid' | 'Unpaid';
  items: {
    bicycle: Types.ObjectId | string;
    quantity: number;
  }[];
}

export default IOrder;
