import { Router } from 'express';
import { bicyclesController } from './bicycle.controller';
import auth from '../../middleware/auth';
import { ROLE } from '../user/user.constant';

const bicycleRouter = Router();

bicycleRouter.post('/', auth(ROLE.Admin), bicyclesController.createBicycle);
bicycleRouter.delete(
  '/:productId',
  auth(ROLE.Admin),
  bicyclesController.deleteSingleBicycle,
);
bicycleRouter.put(
  '/:productId',
  auth(ROLE.Admin),
  bicyclesController.updateSingleBicycle,
);
bicycleRouter.get(
  '/:productId',
  auth(ROLE.Customer, ROLE.Admin),
  bicyclesController.getSingleBicycle,
);
bicycleRouter.get(
  '/',
  auth(ROLE.Customer, ROLE.Admin),
  bicyclesController.getBicycles,
);

export default bicycleRouter;
