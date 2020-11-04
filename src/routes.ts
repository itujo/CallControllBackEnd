import express from 'express';

import CallController from '@controllers/CallController';
import BaseController from '@controllers/BaseController';

const routes = express.Router();

routes.get('/calls', CallController.index);
routes.get('/call/:id', CallController.show);
routes.post('/calls', CallController.store);
routes.patch('/call/:id', CallController.update);
routes.delete('/call/:id', CallController.destroy);

routes.get('/bases', BaseController.index);
routes.get('/base/:id', BaseController.show);
routes.post('/bases', BaseController.store);
routes.patch('/base/:id', BaseController.update);
routes.delete('/base/:id', BaseController.destroy);

export default module.exports = routes;
