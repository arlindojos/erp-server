import { Router } from 'express';
import isOwner from '../../auth/isOwner';
import adminsController from './controller/admin/adminsController';
import companiesController from './controller/companies/companiesController';
import companiesValidator from './controller/companies/companiesValidator';
import adminValidator from './controller/admin/adminValidator';
import cookieParser from 'cookie-parser';

const setupRoutes = Router(); 

setupRoutes.use(cookieParser());

setupRoutes.post('/admin', adminValidator, adminsController.create);
setupRoutes.get('/admin', adminsController.index);

setupRoutes.post('/company', isOwner, companiesValidator, companiesController.create);

export default setupRoutes;  