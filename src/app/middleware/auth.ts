import { NextFunction, Request, Response } from 'express';
import CustomError from '../error/CustomError';
import { ROLE } from '../modules/user/user.constant';
import { verifyToken } from '../modules/auth/auth.utils';
import config from '../config';
import User from '../modules/user/user.model';
import { JwtPayload } from 'jsonwebtoken';

type TUserRole = keyof typeof ROLE;

const auth = (...roles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new CustomError(401, 'You can not see this page');
      }
      const decodedToken = verifyToken(token, config.jwt_secret as string);
      if (!decodedToken) {
        throw new CustomError(401, 'You can not see this page');
      }
      const { email, role } = decodedToken;

      const existUser = User.findOne({ email: email });
      if (!existUser) {
        throw new CustomError(401, 'You can not see this page');
      }

      if (roles && !roles.includes(role)) {
        throw new CustomError(401, 'You can not see this page');
      }

      req.user = decodedToken as JwtPayload;
      next();
    } catch (err: any) {
      res.status(err.statusCode || 500).json({
        message: err.message || 'Failed to get bicycles',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  };
};

export default auth;
