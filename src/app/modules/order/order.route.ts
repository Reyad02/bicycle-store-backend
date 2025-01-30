import { Router } from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';
import { ROLE } from '../user/user.constant';

const orderRouter = Router();

orderRouter.post('/', auth(ROLE.Customer), orderController.createOrder);
orderRouter.delete(
  '/:orderId',
  auth(ROLE.Admin),
  orderController.deleteSingleOrder,
);
orderRouter.put(
  '/:orderId',
  auth(ROLE.Admin),
  orderController.updateSingleOrder,
);
orderRouter.get(
  '/:orderId',
  auth(ROLE.Customer, ROLE.Admin),
  orderController.getSingleOrder,
);
orderRouter.get('/', auth(ROLE.Admin), orderController.getOrders);

export default orderRouter;
