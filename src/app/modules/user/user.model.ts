import { model, Schema } from 'mongoose';
import IUser from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['Customer', 'Admin'],
      required: true,
    },
  },
  { timestamps: true },
);
const User = model<IUser>('User', userSchema);
export default User;
