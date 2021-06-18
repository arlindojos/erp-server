import { Router } from 'express';
import isOwner from '../../auth/auth';
import adminsController from './controller/admin/adminsController';
import companiesController from './controller/companies/companiesController';
import companiesValidator from './controller/companies/companiesValidator';
import adminValidator from './controller/admin/adminValidator';

const setupRoutes = Router(); 

setupRoutes.post('/admin', adminValidator, adminsController.create);
setupRoutes.post('/login/', isOwner, adminsController.index);

setupRoutes.post('/company', isOwner, companiesValidator, companiesController.create);

export default setupRoutes;  