import { Router } from 'express';
import { authControllers } from './auth.controller';

const authRouter = Router();

authRouter.post('/', authControllers.loginUser);

export default authRouter;
