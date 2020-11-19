import BaseController from '@controllers/BaseController';
import { Router } from 'express';

const baseRouter = Router();

baseRouter.get('/', BaseController.index);
baseRouter.get('/:id', BaseController.show);
baseRouter.post('/', BaseController.store);
baseRouter.patch('/:id', BaseController.update);
baseRouter.delete('/:id', BaseController.destroy);

export default baseRouter;
