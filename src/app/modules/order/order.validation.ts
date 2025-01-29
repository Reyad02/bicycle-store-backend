// import { Types } from 'mongoose';
import { z } from 'zod';

const ItemSchema = z.object({
  bicycle: z.string({
    required_error: 'Bicycle ID is required.',
    invalid_type_error: 'Bicycle must be a string.',
  }),
  // bicycle: z.instanceof(Types.ObjectId, { message: 'Bicycle ID is required.' }),
  quantity: z
    .number({
      required_error: 'Quantity is required.',
      invalid_type_error: 'Quantity must be a number.',
    })
    .int()
    .min(1, 'Quantity must be at least 1'),
});

const OrderValidationSchema = z.object({
  totalPrice: z
    .number({
      invalid_type_error: 'Total price must me number',
    })
    .optional(),
  status: z.enum(
    ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    {
      message:
        "Status must be one of 'Pending', 'Processing', 'Shipped', 'Delivered' or 'Cancelled'",
    },
  ),
  paymentStatus: z.enum(['Paid', 'Unpaid'], {
    message: "Payment status must be one of 'Paid' or 'Unpaid'",
  }),
  // user: z.instanceof(Types.ObjectId, { message: 'User id is required' }),
  user: z.string({
    required_error: 'User must be set',
    invalid_type_error: 'User must be string',
  }),
  items: z.array(ItemSchema, { message: 'At least 1 item must be selected' }),
});

export default OrderValidationSchema;
