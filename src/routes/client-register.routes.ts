import express, { Request, Response, Router } from 'express';
import {
	createClientRegister,
	isRegisterClosed,
	getDailyClientRegister,
} from '../controllers/register.controller';
const router = Router();

router.post('/:registerType', isRegisterClosed, createClientRegister);
router.get('/', isRegisterClosed, getDailyClientRegister);

export default router;
