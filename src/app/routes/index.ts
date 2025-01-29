import { Router } from 'express';
import bicycleRouter from '../modules/bicycle/bicycle.route';
import userRouter from '../modules/user/user.route';
import authRouter from '../modules/auth/auth.route';
import orderRouter from '../modules/order/order.route';

const router = Router();

const routes = [
  {
    path: '/products',
    route: bicycleRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.route));
export default router;
