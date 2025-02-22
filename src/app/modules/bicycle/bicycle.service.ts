import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImage';
import { BicycleSearchableFields } from './bicycle.constant';
import Ibicycle from './bicycle.interface';
import Bicycle from './bicycle.model';

const createBicycle = async (
  bicycle: Ibicycle,
  file: any,
): Promise<Ibicycle> => {
  if (file) {
    const imageName = `${bicycle.name}`;
    const path = file;
    const { secure_url } = await sendImageToCloudinary(imageName, path.buffer);
    bicycle.image = secure_url as string;
  }
  const result = await Bicycle.create(bicycle);
  return result;
};

const getSingleBicycle = async (id: string) => {
  const result = await Bicycle.findById(id);
  return result;
};

const updateSingleBicycle = async (
  id: string,
  payload: Partial<Ibicycle>,
  file: any,
) => {
  if (file) {
    const imageName = `${payload!.name}`;
    const path = file;
    const { secure_url } = await sendImageToCloudinary(imageName, path.buffer);
    payload.image = secure_url as string;
  }
  const result = await Bicycle.findByIdAndUpdate(id, payload);
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

const getBicyclesBrands = async () => {
  const result = await Bicycle.distinct('brand');
  return result;
};

export const bicycleServices = {
  createBicycle,
  getSingleBicycle,
  updateSingleBicycle,
  deleteSingleBicycle,
  getBicycles,
  getBicyclesBrands,
};
