import { authorize, guard } from '../controllers/authentication.controller';
import { Router } from 'express';
import {
	createRegister,
	isAvailable,
	getDailyClientRegister,
} from '../controllers/register.controller';
import { finalizeDay } from '../controllers/working-hours.controller';

const router = Router();
router.use(guard);
router.patch('/finalize', finalizeDay);
router.use(authorize(['cashier']));
router.route('/').get(getDailyClientRegister).post(isAvailable, createRegister);

export default router;
