import { z } from 'zod';

const BicycleValidationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .nonempty({ message: 'Name cannot be empty' }),
  brand: z
    .string({ required_error: 'Brand is required' })
    .nonempty({ message: 'Brand cannot be empty' }),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price must be a positive number or zero' }),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    message:
      "Type must be one of 'Mountain', 'Road', 'Hybrid', 'BMX' or 'Electric'",
  }),
  description: z
    .string({ required_error: 'Description is required' })
    .nonempty({ message: 'Description cannot be empty' }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .int({ message: 'Quantity must be an integer' })
    .min(0, { message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean().default(true),
  image: z.string().optional(),
});

export default BicycleValidationSchema;
