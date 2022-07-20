import express, { Request, Response, Router } from 'express';
import {
	createClientRegister,
	isAvailable,
	getDailyClientRegister,
} from '../controllers/register.controller';
const router = Router();

router.post('/:registerType', isAvailable, createClientRegister);
router.get('/', getDailyClientRegister);

export default router;
