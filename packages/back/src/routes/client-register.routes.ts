import express, { Request, Response, Router } from 'express';
import {
	createRegister,
	isAvailable,
	getDailyClientRegister,
} from '../controllers/register.controller';
import { finalizeDay } from '../controllers/working-hours.controller';

const router = Router();
router.patch('/finalize', finalizeDay);
router.use(isAvailable);
router.route('/').post(createRegister).get(getDailyClientRegister);

export default router;
