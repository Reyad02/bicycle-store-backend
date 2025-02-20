import User from '../user/user.model';
import { IAuthUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import CustomError from '../../error/CustomError';

const loginUser = async (loginInfo: IAuthUser) => {
  const isUserExist = await User.findOne({ email: loginInfo?.email });
  if (!isUserExist) {
    throw new CustomError(404, 'User not found');
  }

  const isPassWordMatched = await bcrypt.compare(
    loginInfo.password,
    isUserExist.password,
  );

  if (!isPassWordMatched) {
    throw new CustomError(401, 'Give the correct password');
  }

  const token = createToken(
    isUserExist.email,
    isUserExist.userType,
    config.jwt_secret as string,
    config.jwt_expiration as string,
  );

  // return token;
  return { isUserExist, token };
};

const changePass = async (
  email: string,
  passwords: { oldPass: string; newPass: string },
) => {
  const isUserExist = await User.findOne({ email: email });
  if (!isUserExist) {
    throw new CustomError(404, 'User not found');
  }

  const isPassWordMatched = await bcrypt.compare(
    passwords.oldPass,
    isUserExist.password,
  );

  if (!isPassWordMatched) {
    throw new CustomError(401, 'Give the correct password');
  }

  const newHashedPassword = await bcrypt.hash(
    passwords.newPass,
    Number(config.salt_rounds),
  );

  const res = await User.findOneAndUpdate(
    { email: email },
    { password: newHashedPassword },
    { new: true },
  );

  return res;
};

export const authServices = {
  loginUser,
  changePass,
};
