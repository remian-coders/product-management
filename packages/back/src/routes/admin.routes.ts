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
	deleteUser,
	getUsers,
} from '../controllers/user.controller';

import {
	createRegister,
	getDailyAdminRegister,
	getDailyClientRegister,
} from '../controllers/register.controller';

import { addIP, getIPs, deleteIP } from '../controllers/ip.controller';

import {
	addEmail,
	getEmails,
	deleteEmail,
} from '../controllers/email.controller';

import { addPath, uploadFile } from '../controllers/csv-file.controller';
import { multipartFileUpload } from '../utils/multer-file-upload';

import {
	getWorkingHours,
	updateWorkingHours,
} from '../controllers/working-hours.controller';

const router = Router();

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);

// router.use(guard);
router.patch('/update-password', updatePassword);
router.route('/user').post(createUser).get(getUsers);
router.delete('/user/:id', deleteUser);
router.get('/register', getDailyAdminRegister);
router.post('/register', createRegister);
router.route('/ip-address-config').get(getIPs).post(addIP);
router.delete('/ip-address-config/:id', deleteIP);
router.route('/email-address-config').get(getEmails).post(addEmail);
router.delete('/email-address-config/:id', deleteEmail);
router.patch('/update-csv-path', addPath);
router.post(
	'/upload-csv-file',
	multipartFileUpload.single('csvFile'),
	uploadFile
);
router.route('/working-hours').patch(updateWorkingHours).get(getWorkingHours);
router.get('/get-users', getUsers);
router.delete('/delete-user/:id', deleteUser);

export default router;
