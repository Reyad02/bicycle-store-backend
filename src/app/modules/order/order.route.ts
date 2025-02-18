import { Router } from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';
import { ROLE } from '../user/user.constant';

const orderRouter = Router();

orderRouter.get(
  '/topProducts',
  auth(ROLE.Admin),
  orderController.getTopProducts,
);
orderRouter.get(
  '/totalDeliveredProducts',
  auth(ROLE.Admin),
  orderController.totalDeliveredProducts,
);
orderRouter.get(
  '/totalPendingProducts',
  auth(ROLE.Admin),
  orderController.totalPendingProducts,
);
orderRouter.get(
  '/getTotalIncome',
  auth(ROLE.Admin),
  orderController.getTotalIncome,
);
orderRouter.get(
  '/last7DaysIncome',
  auth(ROLE.Admin),
  orderController.last7DaysIncome,
);
orderRouter.post('/', auth(ROLE.Customer), orderController.createOrder);
orderRouter.post('/:orderId', orderController.successPaymentSingleOrder);
orderRouter.post('/fail/:orderId', orderController.failPaymentSingleOrder);
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
  '/myOrder',
  auth(ROLE.Customer, ROLE.Admin),
  orderController.getMyOrders,
);
orderRouter.get(
  '/:orderId',
  auth(ROLE.Customer, ROLE.Admin),
  orderController.getSingleOrder,
);
orderRouter.get('/', auth(ROLE.Admin), orderController.getOrders);

export default orderRouter;
