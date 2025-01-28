import { Router } from 'express';
import { bicyclesController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/', bicyclesController.createBicycle);
bicycleRouter.delete(
  '/:productId',
  bicyclesController.deleteSingleBicycle,
);
bicycleRouter.put(
  '/:productId',
  bicyclesController.updateSingleBicycle,
);
bicycleRouter.get('/:productId', bicyclesController.getSingleBicycle);
bicycleRouter.get('/', bicyclesController.getBicycles);

export default bicycleRouter;
