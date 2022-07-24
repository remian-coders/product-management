import express, { Request, Response, Router } from 'express';
import {
	createRegister,
	isAvailable,
	getDailyClientRegister,
} from '../controllers/register.controller';
const router = Router();
// router.use(isAvailable);
router.route('/').post(createRegister).get(getDailyClientRegister);

export default router;
