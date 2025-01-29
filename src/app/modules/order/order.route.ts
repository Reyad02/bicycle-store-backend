import { Router } from 'express';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.delete('/:orderId', orderController.deleteSingleOrder);
orderRouter.put('/:orderId', orderController.updateSingleOrder);
orderRouter.get('/:orderId', orderController.getSingleOrder);
orderRouter.get('/', orderController.getOrders);

export default orderRouter;
