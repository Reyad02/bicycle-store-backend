import { Request, Response } from 'express';
import { authServices } from './auth.service';
import loginValidationSchema from './auth.validation';

const loginUser = async (req: Request, res: Response) => {
  try {
    const loginCredential = loginValidationSchema.parse(req.body);
    const result = await authServices.loginUser(loginCredential);
    res.json({
      message: 'User logged in successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        err,
        stack: err.stack || 'No stack trace available',
      });
    } else {
      res.status(err.statusCode || 500).json({
        message: err.message || 'Failed to login user',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

const changePass = async (req: Request, res: Response) => {
  try {
    const { email } = req.user;
    const passwords = req.body;
    const result = await authServices.changePass(email, passwords);
    res.json({
      message: 'Password successfully changed',
      success: true,
      data: result,
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        err,
        stack: err.stack || 'No stack trace available',
      });
    } else {
      res.status(err.statusCode || 500).json({
        message: err.message || 'Failed to login user',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

export const authControllers = {
  loginUser,
  changePass,
};
