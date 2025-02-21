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
  color: z
    .string({ required_error: 'Color is required' })
    .nonempty({ message: 'Color cannot be empty' }),
  material: z
    .string({ required_error: 'Material is required' })
    .nonempty({ message: 'Material cannot be empty' }),
  seatpost: z
    .string({ required_error: 'Seatpost is required' })
    .nonempty({ message: 'Seatpost cannot be empty' }),
  weight: z
    .number({ required_error: 'Weight is required' })
    .min(0, { message: 'Weight must be a non-negative integer' }),
  torque: z
    .number({ required_error: 'Torque is required' })
    .min(0, { message: 'Torque must be a non-negative integer' }),
  frameSize: z
    .number({ required_error: 'Frame Size is required' })
    .min(0, { message: 'Frame Size must be a non-negative integer' }),
  chain: z
    .string({ required_error: 'Chain is required' })
    .nonempty({ message: 'Chain cannot be empty' }),
});

const BicycleUpdateValidationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .nonempty({ message: 'Name cannot be empty' })
    .optional(),
  brand: z
    .string({ required_error: 'Brand is required' })
    .nonempty({ message: 'Brand cannot be empty' })
    .optional(),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price must be a positive number or zero' })
    .optional(),
  type: z
    .enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      message:
        "Type must be one of 'Mountain', 'Road', 'Hybrid', 'BMX' or 'Electric'",
    })
    .optional(),
  description: z
    .string({ required_error: 'Description is required' })
    .nonempty({ message: 'Description cannot be empty' })
    .optional(),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .int({ message: 'Quantity must be an integer' })
    .min(0, { message: 'Quantity must be a non-negative integer' })
    .optional(),
  inStock: z.boolean().default(true).optional(),
  image: z.string().optional(),
  color: z.string().nonempty({ message: 'Color cannot be empty' }).optional(),
  material: z
    .string()
    .nonempty({ message: 'Material cannot be empty' })
    .optional(),
  seatpost: z
    .string()
    .nonempty({ message: 'Seatpost cannot be empty' })
    .optional(),
  weight: z
    .number({ required_error: 'Weight is required' })
    .min(0, { message: 'Weight must be a non-negative integer' })
    .optional(),
  torque: z
    .number({ required_error: 'Torque is required' })
    .min(0, { message: 'Torque must be a non-negative integer' })
    .optional(),
  frameSize: z
    .number({ required_error: 'Frame Size is required' })
    .min(0, { message: 'Frame Size must be a non-negative integer' })
    .optional(),
  chain: z.string().nonempty({ message: 'Chain cannot be empty' }).optional(),
});

export const BicycleValidation = {
  BicycleValidationSchema,
  BicycleUpdateValidationSchema,
};
