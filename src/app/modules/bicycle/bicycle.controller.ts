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
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        err,
        stack: err.stack || 'No stack trace available',
      });
    } else {
      res.status(err.statusCode || 500).json({
        message: err.message || 'Failed to create bicycle',
        success: false,
        error: err,
        stack: err?.stack,
      });
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
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        err,
        stack: err.stack || 'No stack trace available',
      });
    } else {
      res.status(err.statusCode || 500).json({
        message: err.message || 'Failed to get bicycle',
        success: false,
        error: err,
        stack: err?.stack,
      });
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
        message: err.message || 'Failed to update bicycle',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
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
        message: err.message || 'Failed to delete bicycle',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

const getBicycles = async (req: Request, res: Response) => {
  try {
    const { products, metaData } = await bicycleServices.getBicycles(req.query);
    res.json({
      message: 'Bicycles retrieved successfully',
      success: true,
      data: products,
      metaData,
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
        message: err.message || 'Failed to get bicycles',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

export const bicyclesController = {
  createBicycle,
  getSingleBicycle,
  updateSingleBicycle,
  deleteSingleBicycle,
  getBicycles,
};
