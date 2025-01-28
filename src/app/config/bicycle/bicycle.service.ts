import QueryBuilder from '../../builder/QueryBuilder';
import { BicycleSearchableFields } from './bicycle.contant';
import Ibicycle from './bicycle.interface';
import Bicycle from './bicycle.model';

const createBicycle = async (bicycle: Ibicycle): Promise<Ibicycle> => {
  const result = await Bicycle.create(bicycle);
  return result;
};

const getSingleBicycle = async (id: string) => {
  const result = await Bicycle.findById(id);
  return result;
};

const updateSingleBicycle = async (id: string, payload: Ibicycle) => {
  const result = await Bicycle.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSingleBicycle = async (id: string) => {
  const result = await Bicycle.findByIdAndDelete(id);
  return result;
};

const getBicycles = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(Bicycle.find(), query)
    .search(BicycleSearchableFields)
    .filter()
    .sort()
    .pagination()
    .select();
  const products = await result.defaultRes;
  const metaData = await result.countTotal();
  return {
    products,
    metaData,
  };
};

export const bicycleServices = {
  createBicycle,
  getSingleBicycle,
  updateSingleBicycle,
  deleteSingleBicycle,
  getBicycles,
};
