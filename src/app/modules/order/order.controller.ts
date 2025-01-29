import { Request, Response } from 'express';
import OrderValidationSchema from './order.validation';
import { orderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const parseBody = OrderValidationSchema.parse(body);
    const result = await orderServices.createOrder(parseBody);
    res.json({
      message: 'Order placed successfully',
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
      res.send(err);
    }
  }
};
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await orderServices.getSingleOrder(orderId);
    res.json({
      message: 'Order retrieved successfully',
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
      res.send(err);
    }
  }
};

const updateSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const payload = req.body;
    const result = await orderServices.updateSingleOrder(orderId, payload);
    res.json({
      message: 'Order updated successfully',
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

const deleteSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    await orderServices.deleteSingleOrder(orderId);
    res.json({
      message: 'Order deleted successfully',
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const { orders } = await orderServices.getOrders(req.query);
    res.json({
      message: 'Orders retrieved successfully',
      success: true,
      data: orders,
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
      res.send(err);
    }
  }
};

export const orderController = {
  createOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
  getOrders,
};
