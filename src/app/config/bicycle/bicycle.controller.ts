import { Request, Response } from 'express';
import BicycleValidationSchema from './bicycle.validation';
import { bicycleServices } from './bicycle.service';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const parseBody = BicycleValidationSchema.parse(body);
    const result = await bicycleServices.createBicycle(parseBody);
    res.json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
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
const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bicycleServices.getSingleBicycle(productId);
    res.json({
      message: 'Bicycle retrieved successfully',
      success: true,
      data: result,
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

const updateSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const payload = req.body;
    const result = await bicycleServices.updateSingleBicycle(
      productId,
      payload,
    );
    res.json({
      message: 'Bicycle updated successfully',
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

const deleteSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await bicycleServices.deleteSingleBicycle(productId);
    res.json({
      message: 'Bicycle deleted successfully',
      success: true,
      data: {},
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

const getBicycles = async (req: Request, res: Response) => {
  try {
    const {products} = await bicycleServices.getBicycles(req.query);
    res.json({
      message: 'Bicycles retrieved successfully',
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

export const bicyclesController = {
  createBicycle,
  getSingleBicycle,
  updateSingleBicycle,
  deleteSingleBicycle,
  getBicycles
};
