import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
import { ROLE } from './user.constant';

const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.put('/:email', auth(ROLE.Customer), userController.updateSingleUser);
userRouter.get(
  '/:email',
  auth(ROLE.Customer, ROLE.Admin),
  userController.getSingleUser,
);
userRouter.get('/', auth(ROLE.Admin), userController.getUsers);

export default userRouter;
