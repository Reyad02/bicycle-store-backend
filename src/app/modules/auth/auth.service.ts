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

  return token;
};

export const authServices = {
  loginUser,
};
