import express, { Request, Response, Router } from 'express';
import {
	createClientRegister,
	isAvailable,
	getDailyClientRegister,
} from '../controllers/register.controller';
const router = Router();
router.use(isAvailable);
router.route('/').post(createClientRegister).get(getDailyClientRegister);

export default router;
