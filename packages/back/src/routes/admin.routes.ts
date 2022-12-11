import { Router } from 'express';
import {
	login,
	updatePassword,
	guard,
	forgotPassword,
	resetPassword,
	authorize,
} from '../controllers/authentication.controller';
import {
	createUser,
	deleteUser,
	getUsers,
} from '../controllers/user.controller';

import {
	createRegister,
	getByTicket,
} from '../controllers/register.controller';

import {
	addEmail,
	getEmails,
	deleteEmail,
} from '../controllers/email.controller';

import {
	addPath,
	uploadFile,
	getPath,
} from '../controllers/csv-file.controller';
import { multipartFileUpload } from '../utils/multer-file-upload';

import {
	getWorkingHours,
	updateWorkingHours,
	setTaskSchedulerState,
} from '../controllers/working-hours.controller';

import { getIssues, deleteIssue } from '../controllers/issue.controller';
import {
	getAdminPayments,
	getAllPayments,
	makePayment,
} from '../controllers/payments.controller';

const router = Router();
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);
router.use(guard);
router.get('/', (req, res, next) => {
	res.status(200).json({
		status: 'success',
		message: `Hello ${req.user.name}`,
		data: { user: req.user },
	});
});
router.use(authorize(['admin']));
router.patch('/update-password', updatePassword);
router.route('/user').post(createUser).get(getUsers);
router.delete('/user/:id', deleteUser);
router.post('/register', createRegister);
router.get('/register/:ticketNo', getByTicket);
router.route('/payments').get(getAdminPayments).patch(makePayment);
router.get('/all-payments', getAllPayments);

router.route('/email-address-config').get(getEmails).post(addEmail);
router.delete('/email-address-config/:id', deleteEmail);
router.route('/csv-path').get(getPath).patch(addPath);
router.post(
	'/upload-csv-file',
	multipartFileUpload.single('csvFile'),
	uploadFile
);
router.route('/working-hours').patch(updateWorkingHours).get(getWorkingHours);
router.patch('/set-scheduler-state', setTaskSchedulerState);
router.route('/issues').get(getIssues);
router.route('/issues/:id').delete(deleteIssue);
router.get('/get-users', getUsers);
router.delete('/delete-user/:id', deleteUser);

export default router;
