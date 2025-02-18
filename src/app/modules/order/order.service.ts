import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import IOrder from './order.interface';
import Order from './order.model';
import Bicycle from '../bicycle/bicycle.model';
import CustomError from '../../error/CustomError';
import SSLCommerz from 'sslcommerz-lts';
import config from '../../config';
import User from '../user/user.model';

const createOrder = async (orderInfo: IOrder) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const sslcz = new SSLCommerz(
      config.SSLCOMMERZ_STORE_ID!,
      config.SSLCOMMERZ_STORE_PASSWORD!,
      false,
    );
    let totalPrice = 0;
    if (!orderInfo.totalPrice) {
      for (const item of orderInfo.items) {
        const bicycle = await Bicycle.findById(item.bicycle).session(session);
        if (!bicycle) {
          throw new CustomError(404, 'Bicycle is not found');
        }
        if (bicycle.quantity < item.quantity) {
          if (bicycle.quantity === 0) {
            throw new CustomError(400, `${bicycle.name} is not available`);
          }
          throw new CustomError(
            400,
            `The available quantity of ${bicycle.name} is ${bicycle.quantity}`,
          );
        }
        totalPrice += bicycle.price * item.quantity;
      }
      orderInfo.totalPrice = totalPrice;
    }

    const result = await Order.create([orderInfo], { session });
    if (!result) {
      throw new CustomError(400, 'Can not create a order');
    }

    const transactionId = 'TXN_' + new Date().getTime(); // Unique Transaction ID

    const data = {
      total_amount: totalPrice,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `http://localhost:3000/api/orders/${result[0]._id}`,
      fail_url: `http://localhost:3000/api/orders/fail/${result[0]._id}`,
      cancel_url: 'http://localhost:3000/orders/cancel',
      ipn_url: 'http://localhost:3000/orders/ipn',
      shipping_method: 'Courier',
      product_name: 'Bicycle',
      product_category: 'Bicycle',
      product_profile: 'general',
      cus_name: 'N/A',
      cus_email: 'N/A',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const response = await sslcz.init(data);

    await session.commitTransaction();
    await session.endSession();
    const insertedOrder = await result[0].populate('items.bicycle');
    return { insertedOrder, response, transactionId };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err.message);
  }
};

export const handlePaymentSuccess = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const order = await Order.findById(id).session(session);
    if (!order) {
      throw new CustomError(400, 'Order not found');
    }

    for (const item of order.items) {
      const bicycle = await Bicycle.findById(item.bicycle).session(session);
      if (!bicycle) {
        throw new CustomError(400, 'Bicycle not found');
      }
      if (bicycle.quantity < item.quantity) {
        throw new CustomError(400, `Not enough stock for ${bicycle.name}`);
      }
      bicycle.quantity -= item.quantity;
      await bicycle.save({ session });
    }

    order.paymentStatus = 'Paid';
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { result: order, link: 'http://localhost:5173/orders/success' };
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err.message);
  }
};

export const handlePaymentFail = async () => {
  const link = 'http://localhost:5173/orders/fail';
  return link;
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id).populate('items.bicycle');
  return result;
};

const updateSingleOrder = async (id: string, payload: IOrder) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('items.bicycle');
  return result;
};

const deleteSingleOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const getOrders = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(Order.find(), query)
    .filter()
    .sort()
    .pagination()
    .select();
  const orders = await result.defaultRes
    .populate('items.bicycle')
    .populate('user');
  const metaData = await result.countTotal();
  return {
    orders,
    metaData,
  };
};

const getMyOrders = async (email: string) => {
  const user = await User.findOne({ email: email });
  const result = await Order.find({
    user: user?._id,
    paymentStatus: 'Paid',
  }).populate('items.bicycle');
  return result;
};

const getTopProducts = async () => {
  const result = await Order.aggregate([
    { $match: { paymentStatus: 'Paid' } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.bicycle',
        totalQuantity: { $sum: '$items.quantity' },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'bicycles',
        localField: '_id',
        foreignField: '_id',
        as: 'bicycleDetails',
      },
    },
    { $unwind: '$bicycleDetails' },
    {
      $project: {
        _id: 0,
        bicycleId: '$_id',
        totalQuantity: 1,
        bicycleDetails: 1,
      },
    },
  ]);

  return result;
};

const totalDeliveredProducts = async () => {
  const result = await Order.aggregate([
    { $match: { paymentStatus: 'Paid', status: 'Delivered' } },
    { $unwind: '$items' },
    {
      $group: {
        _id: null,
        totalDelivered: { $sum: '$items.quantity' },
      },
    },
    { $project: { _id: 0, totalDelivered: 1 } },
  ]);
  return result.length > 0 ? result[0].totalDelivered : 0;
};

const totalPendingProducts = async () => {
  const result = await Order.aggregate([
    { $match: { paymentStatus: 'Paid', status: 'Pending' } },
    { $unwind: '$items' },
    {
      $group: {
        _id: null,
        totalPending: { $sum: '$items.quantity' },
      },
    },
    { $project: { _id: 0, totalPending: 1 } },
  ]);
  return result.length > 0 ? result[0].totalPending : 0;
};

const getTotalIncome = async () => {
  const result = await Order.aggregate([
    { $match: { paymentStatus: 'Paid' } },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: '$totalPrice' },
      },
    },
    {
      $project: { _id: 0, totalIncome: 1 },
    },
  ]);

  return result.length > 0 ? result[0].totalIncome : 0;
};

const last7DaysIncome = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30);
  const result = await Order.aggregate([
    { $match: { paymentStatus: 'Paid', createdAt: { $gte: sevenDaysAgo } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        totalSold: { $sum: '$items.quantity' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return result;
};

export const orderServices = {
  createOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
  getOrders,
  handlePaymentSuccess,
  handlePaymentFail,
  getMyOrders,
  getTopProducts,
  totalDeliveredProducts,
  totalPendingProducts,
  getTotalIncome,
  last7DaysIncome,
};
