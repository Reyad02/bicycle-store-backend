import { Request, Response } from 'express';
import UserValidationSchema from './user.validation';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const parseBody = UserValidationSchema.parse(body);
    const result = await userServices.createUser(parseBody);
    res.json({
      message: 'User created successfully',
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
        message: err.message || 'Failed to create user',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const result = await userServices.getSingleUser(email);
    res.json({
      message: 'User retrieved successfully',
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
        message: err.message || 'Failed to get user',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const payload = req.body;
    const result = await userServices.updateSingleUser(email, payload);
    res.json({
      message: 'User updated successfully',
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
        message: err.message || 'Failed to update user',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const { users, metaData } = await userServices.getUsers(req.query);
    res.json({
      message: 'Users retrieved successfully',
      success: true,
      data: users,
      metaData: metaData,
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
        message: err.message || 'Failed to get users',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

export const userController = {
  createUser,
  getSingleUser,
  updateSingleUser,
  getUsers,
};
