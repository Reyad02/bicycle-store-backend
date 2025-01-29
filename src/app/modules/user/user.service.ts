import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import IUser from './user.interface';
import User from './user.model';

const createUser = async (userDetails: IUser): Promise<IUser> => {
  const result = await User.create(userDetails);
  return result;
};

const getSingleUser = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateSingleUser = async (email: string, payload: IUser) => {
  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
  });
  return result;
};

const getUsers = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .pagination()
    .select();
  const users = await result.defaultRes;
  const metaData = await result.countTotal();
  return {
    users,
    metaData,
  };
};

export const userServices = {
  createUser,
  getSingleUser,
  updateSingleUser,
  getUsers,
};
