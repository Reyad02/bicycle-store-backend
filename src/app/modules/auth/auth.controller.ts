import { Request, Response } from 'express';
import { authServices } from './auth.service';
import config from '../../config';

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUser(req.body);
    res.cookie('token', result, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    res.json({
      message: 'User logged in successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'Failed to login user',
      success: false,
      error: err,
      stack: err?.stack,
    });
  }
};

export const authControllers = {
  loginUser,
};
