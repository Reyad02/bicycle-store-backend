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
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        err,
        stack: err.stack || 'No stack trace available',
      });
    } else {
      res.status(err.statusCode || 500).json({
        message: err.message || 'Failed to create order',
        success: false,
        error: err,
        stack: err?.stack,
      });
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
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        err,
        stack: err.stack || 'No stack trace available',
      });
    } else {
      res.status(err.statusCode || 500).json({
        message: err.message || 'Failed to get order',
        success: false,
        error: err,
        stack: err?.stack,
      });
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
        message: err.message || 'Failed to update order',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
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
        message: err.message || 'Failed to delete order',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { orders, metaData } = await orderServices.getOrders(req.query);
    res.json({
      message: 'Orders retrieved successfully',
      success: true,
      data: orders,
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
        message: err.message || 'Failed to get order',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

const successPaymentSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    // const payload = req.body;
    const result = await orderServices.handlePaymentSuccess(orderId);
    // res.json({
    //   message: 'Order payment success',
    //   success: true,
    //   data: result,
    // });
    res.redirect(result.link);
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
        message: err.message || 'Failed to update order',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};

const failPaymentSingleOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.handlePaymentFail();
    res.redirect(result);
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
        message: err.message || 'Failed to update order',
        success: false,
        error: err,
        stack: err?.stack,
      });
    }
  }
};


const getMyOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await orderServices.getMyOrders(userId);
    res.json({
      message: 'My orders retrieved successfully',
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

export const orderController = {
  createOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
  getOrders,
  successPaymentSingleOrder,
  failPaymentSingleOrder,
  getMyOrders
};
