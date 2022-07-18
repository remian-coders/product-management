import { Router } from 'express';
import {
	getAdminPage,
	emailConfigPage,
	userConfigPage,
	ipConfigPage,
	passwordUpdatePage,
	csvFileConfigPage,
} from '../controllers/view.controller';

const router = Router();

router.get('/admin', getAdminPage);
router.get('/admin/user-config', userConfigPage);
router.get('/admin/email-config', emailConfigPage);
router.get('/admin/ip-config', ipConfigPage);
router.get('/admin/csv-file-config', csvFileConfigPage);
router.get('/admin/update-my-password', passwordUpdatePage);
export default router;
