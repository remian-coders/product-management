import { Router } from 'express';
import {
	getAdminPage,
	emailConfigPage,
	userConfigPage,
	ipConfigPage,
	passwordUpdatePage,
	csvFileConfigPage,
	forgotPasswordPage,
	resetPasswordPage,
	registerPage,
} from '../controllers/view.controller';

const router = Router();

router.get('/register', registerPage);

router.get('/admin', getAdminPage);
router.get('/admin/forgot-password', forgotPasswordPage);
router.get('/admin/reset-password', resetPasswordPage);

router.get('/admin/user-config', userConfigPage);
router.get('/admin/email-config', emailConfigPage);
router.get('/admin/ip-config', ipConfigPage);
router.get('/admin/csv-file-config', csvFileConfigPage);
router.get('/admin/update-my-password', passwordUpdatePage);

export default router;
