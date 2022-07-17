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

const router = Router();

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:resetToken', resetPassword);

router.use(guard);
router.patch('/update-password', updatePassword);
router.patch('/update-me', updateMe);
router.post('/create-user', createUser);
// router.delete('/delete-me', deleteMe);
// router.get('/get-users', getUsers);
// router.delete('/delete-user/:id', deleteUser);

export default router;
