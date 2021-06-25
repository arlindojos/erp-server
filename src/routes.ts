import { Router } from 'express';
import setupRoutes from './api/setup/routes';

const routes = Router();

routes.use('/setup', setupRoutes);

export default routes;