import { Request, Response } from 'express';
import { authServices } from './auth.service';

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUser(req.body);
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
