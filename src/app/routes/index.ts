import { Router } from 'express';
import bicycleRouter from '../modules/bicycle/bicycle.route';
import userRouter from '../modules/user/user.route';

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
];

routes.forEach((route) => router.use(route.path, route.route));
export default router;
