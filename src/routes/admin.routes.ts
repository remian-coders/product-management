import { Router } from 'express';
import {
	login,
	updatePassword,
	guard,
	forgotPassword,
	resetPassword,
} from '../controllers/authentication.controller';
import {
	createUser,
	deleteMe,
	updateMe,
	deleteUser,
	getUsers,
} from '../controllers/user.controller';

import {
	createAdminRegister,
	getDailyAdminRegister,
} from '../controllers/register.controller';

import { addIP, getIPs, deleteIP } from '../controllers/ip.controller';

import {
	addEmail,
	getEmails,
	deleteEmail,
} from '../controllers/email.controller';

import { addPath, uploadFile } from '../controllers/csv-path.controller';
const router = Router();

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:resetToken', resetPassword);

router.use(guard);
router.patch('/update-password', updatePassword);
router.post('/create-user', createUser);
router.get('/register', getDailyAdminRegister);
router.post('/register/:registerType', createAdminRegister);
router.route('/ip-address-config').get(getIPs).post(addIP);
router.delete('/ip-address-config/:id', deleteIP);
router.route('/email-address-config').get(getEmails).post(addEmail);
router.delete('/email-address-config/:id', deleteEmail);
router.post('/csv-path-config', addPath);
router.post('/csv-file-upload', uploadFile);
// router.patch('/update-me', updateMe);
// router.delete('/delete-me', deleteMe);
// router.get('/get-users', getUsers);
// router.delete('/delete-user/:id', deleteUser);

export default router;
