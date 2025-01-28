import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
export const createToken = (
  email: string,
  role: string,
  secret: string,
  expiredTime: string,
) => {
  return jwt.sign({ email, role }, secret, {
    expiresIn: expiredTime,
  } as SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
