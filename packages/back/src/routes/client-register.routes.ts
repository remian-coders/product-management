import { authorize, guard } from '../controllers/authentication.controller';
import express, { Request, Response, Router } from 'express';
import {
	createRegister,
	isAvailable,
	getDailyClientRegister,
} from '../controllers/register.controller';
import { finalizeDay } from '../controllers/working-hours.controller';

const router = Router();
router.use(guard, isAvailable);
router.patch('/finalize', finalizeDay);
router.use(authorize(['cashier']));
router.route('/').get(getDailyClientRegister).post(createRegister);

export default router;
