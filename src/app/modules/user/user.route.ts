import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.put('/:email', userController.updateSingleUser);
userRouter.get('/:email', userController.getSingleUser);
userRouter.get('/', userController.getUsers);

export default userRouter;
