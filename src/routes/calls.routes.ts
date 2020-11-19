import CallController from '@controllers/CallController';
import { Router } from 'express';

const callRouter = Router();

callRouter.get('/', CallController.index);
callRouter.get('/:id', CallController.show);
callRouter.post('/', CallController.store);
callRouter.patch('/:id', CallController.update);
callRouter.delete('/:id', CallController.destroy);

export default callRouter;
