import { NextFunction, Request, Response, Router } from 'express';
import { bicyclesController } from './bicycle.controller';
import auth from '../../middleware/auth';
import { ROLE } from '../user/user.constant';
import { upload } from '../../utils/sendImage';

const bicycleRouter = Router();

bicycleRouter.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(ROLE.Admin),
  bicyclesController.createBicycle,
);
bicycleRouter.put(
  '/:productId',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(ROLE.Admin),
  bicyclesController.updateSingleBicycle,
);
bicycleRouter.delete(
  '/:productId',
  auth(ROLE.Admin),
  bicyclesController.deleteSingleBicycle,
);
bicycleRouter.get('/getBrands', bicyclesController.getBicyclesBrands);
bicycleRouter.get('/:productId', bicyclesController.getSingleBicycle);
bicycleRouter.get('/', bicyclesController.getBicycles);

export default bicycleRouter;
