import { Router } from 'express';
import adminsController from './controller/admin/adminsController';
import companiesController from './controller/companies/companiesController';
import companiesValidator from './controller/companies/companiesValidator';
import adminValidator from './controller/admin/adminValidator';
import isAuth from '../../auth/auth';

const setupRoutes = Router(); 

setupRoutes.post('/admin', adminValidator, adminsController.create);

setupRoutes.get('/company',  companiesController.create);

export default setupRoutes;  