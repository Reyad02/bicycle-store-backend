import { Router } from 'express';
import bicycleRouter from '../config/bicycle/bicycle.route';

const router = Router();

const routes = [
  {
    path: '/products',
    route: bicycleRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.route));
export default router;
