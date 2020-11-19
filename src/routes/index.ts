import { Router } from 'express';
import baseRouter from './bases.routes';
import callRouter from './calls.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/calls', callRouter);
routes.use('/bases', baseRouter);
routes.use('/users', userRouter);

export default routes;
