import { authorize, guard } from '../controllers/authentication.controller';
import { Router } from 'express';
import {
	createRegister,
	isAvailable,
	getByTicket,
} from '../controllers/register.controller';
import { finalizeDay } from '../controllers/working-hours.controller';
import {
	getDailyClientPayments,
	makePayment,
} from '../controllers/payments.controller';

const router = Router();
router.use(guard);
router.patch('/finalize', finalizeDay);
router.use(authorize(['cashier']));
router.get('/register/:ticketNo', getByTicket);
router.post('/register', isAvailable, createRegister);
router.route('/payments').get(getDailyClientPayments).patch(makePayment);

export default router;
