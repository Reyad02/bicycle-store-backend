import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import IOrder from './order.interface';
import Order from './order.model';
import Bicycle from '../bicycle/bicycle.model';

const createOrder = async (orderInfo: IOrder) => {
  const session = await mongoose.startSession();
  try {
    if (!orderInfo.totalPrice) {
      let totalPrice = 0;
      for (const item of orderInfo.items) {
        const bicycle = await Bicycle.findById(item.bicycle);
        if (!bicycle) {
          return new Error('Bicycle is not found');
        }
        totalPrice += bicycle.price * item.quantity;
      }
      orderInfo.totalPrice = totalPrice;
    }

    session.startTransaction();

    const result = await Order.create([orderInfo], { session });
    if (!result) {
      throw new Error('Failed to order');
    }

    for (const item of orderInfo.items) {
      await Bicycle.findByIdAndUpdate(
        item.bicycle,
        {
          $inc: { quantity: -item.quantity },
        },
        { session },
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return result[0].populate('items.bicycle');
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
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

export const orderServices = {
  createOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
  getOrders,
};
