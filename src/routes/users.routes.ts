import UserController from '@controllers/UserController';

import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', UserController.index);
userRouter.get('/:id', UserController.show);
userRouter.post('/', UserController.store);
userRouter.patch('/:id', UserController.update);
userRouter.delete('/:id', UserController.destroy);

export default userRouter;
