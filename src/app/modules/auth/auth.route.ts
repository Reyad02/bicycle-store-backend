import { Router } from 'express';
import { authControllers } from './auth.controller';
import auth from '../../middleware/auth';
import { ROLE } from '../user/user.constant';

const authRouter = Router();

authRouter.post(
  '/change-pass',
  auth(ROLE.Customer, ROLE.Admin),
  authControllers.changePass,
);
authRouter.post('/', authControllers.loginUser);

export default authRouter;
