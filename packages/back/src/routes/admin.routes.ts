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
	getAdminRegister,
	getAllRegister,
} from '../controllers/register.controller';

import { addIP, getIPs, deleteIP } from '../controllers/ip.controller';

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
} from '../controllers/working-hours.controller';

import { getIssues, deleteIssue } from '../controllers/issue.controller';

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
router.patch('/update-password', updatePassword);
router.route('/user').post(createUser).get(getUsers);
router.delete('/user/:id', deleteUser);
router.route('/register').post(createRegister).get(getAdminRegister);
router.get('/all-register', getAllRegister);

router.route('/ip-address-config').get(getIPs).post(addIP);
router.delete('/ip-address-config/:id', deleteIP);
router.route('/email-address-config').get(getEmails).post(addEmail);
router.delete('/email-address-config/:id', deleteEmail);
router.route('/csv-path').get(getPath).patch(addPath);
router.post(
	'/upload-csv-file',
	multipartFileUpload.single('csvFile'),
	uploadFile
);
router.route('/working-hours').patch(updateWorkingHours).get(getWorkingHours);
router.route('/issues').get(getIssues);
router.route('/issues/:id').delete(deleteIssue);
router.get('/get-users', getUsers);
router.delete('/delete-user/:id', deleteUser);

export default router;
