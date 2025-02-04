import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
import { ROLE } from './user.constant';
import { upload } from '../../utils/sendImage';

const userRouter = Router();

userRouter.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  userController.createUser,
);
userRouter.put('/:email', auth(ROLE.Customer), userController.updateSingleUser);
userRouter.get(
  '/:email',
  auth(ROLE.Customer, ROLE.Admin),
  userController.getSingleUser,
);
userRouter.get('/', auth(ROLE.Admin), userController.getUsers);

export default userRouter;
