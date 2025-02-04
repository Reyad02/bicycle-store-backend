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

    // payment
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

    // for (const item of orderInfo.items) {
    //   await Bicycle.findByIdAndUpdate(
    //     item.bicycle,
    //     {
    //       $inc: { quantity: -item.quantity },
    //     },
    //     { session },
    //   );
    // }
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

// export const handlePaymentSuccess = async (id: string) => {
//   const result = await Order.findByIdAndUpdate(
//     id,
//     { paymentStatus: 'Paid', status: 'Delivered' },
//     {
//       new: true,
//     },
//   ).populate('items.bicycle');
//   const link = 'http://localhost:5173/orders/success';
//   return { result, link };
// };

export const handlePaymentSuccess = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the order
    const order = await Order.findById(id).session(session);
    if (!order) {
      throw new CustomError(400, 'Order not found');
    }

    // Reduce product quantity only after payment success
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

    // Update order status to 'Paid' and 'Delivered'
    order.paymentStatus = 'Paid';
    order.status = 'Delivered';
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
    //   .search(BicycleSearchableFields)
    .filter()
    .sort()
    .pagination()
    .select();
  const orders = await result.defaultRes.populate('items.bicycle');
  const metaData = await result.countTotal();
  return {
    orders,
    metaData,
  };
};

const getMyOrders = async (email: string) => {
  const user = await User.findOne({ email: email });
  const result = await Order.find({ user: user?._id, paymentStatus: 'Paid' }).populate('items.bicycle');
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
};
