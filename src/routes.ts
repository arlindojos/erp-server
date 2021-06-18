import { Router } from 'express';
import setupRoutes from './api/setup/routes';
import refreshTokenController from './lib/auth/refreshTokenController';


const routes = Router(); 

routes.use('/refreshtoken', refreshTokenController);

routes.use('/setup', setupRoutes);

export default routes;  