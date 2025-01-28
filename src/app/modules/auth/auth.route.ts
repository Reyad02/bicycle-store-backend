import { Router } from 'express';
import { authControllers } from './auth.controller';

const authRouter = Router();

authRouter.get('/', authControllers.loginUser);

export default authRouter;
