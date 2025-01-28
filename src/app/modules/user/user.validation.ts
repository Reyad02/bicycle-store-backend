import { z } from 'zod';

const UserValidationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .nonempty({ message: 'Name cannot be empty' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email cannot be empty' }),
  password: z
    .string({ required_error: 'Password is required' })
    .nonempty({ message: 'Password cannot be empty' }),
  userType: z.enum(['Customer', 'Admin'], {
    message: "Type must be one of 'Admin' or 'Customer'",
  }),
});

export default UserValidationSchema;
