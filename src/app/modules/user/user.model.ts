import { model, Schema } from 'mongoose';
import IUser from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import CustomError from '../../error/CustomError';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    profileImg: {
      type: String,
    },
    accountStatus: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const isUserExist = await User.findOne({ email: this.email });
  if (isUserExist) {
    throw new CustomError(400, 'User with this email already exists!');
  }
  next();
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

const User = model<IUser>('User', userSchema);

export default User;
