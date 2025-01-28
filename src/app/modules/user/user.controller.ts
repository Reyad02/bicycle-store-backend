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
    console.log(err);
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
    console.log(err);
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const payload = req.body;
    const result = await userServices.updateSingleUser(
      email,
      payload,
    );
    res.json({
      message: 'User updated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.name || 'Something Went Wrong, So Data Is Not Inserted',
      success: false,
      error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const {products} = await userServices.getUsers(req.query);
    res.json({
      message: 'Users retrieved successfully',
      success: true,
      data: products,
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      res.status(500).json({
        message: 'Validation failed',
        success: false,
        err,
        stack: err.stack || 'No stack trace available',
      });
    } else {
      console.log(err);
    }
  }
};

export const userController = {
  createUser,
  getSingleUser,
  updateSingleUser,
  getUsers
};
