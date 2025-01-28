import User from '../user/user.model';
import { IAuthUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';

const loginUser = async (loginInfo: IAuthUser) => {
  const isUserExist = await User.findOne({ email: loginInfo?.email });
  if (!isUserExist) {
    throw new Error('No user found!');
  }

  const isPassWordMatched = await bcrypt.compare(
    loginInfo.password,
    isUserExist.password,
  );

  if (!isPassWordMatched) {
    throw new Error('Password did not matched');
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
