import { Router } from 'express';
import {
	login,
	updatePassword,
	guard,
} from '../controllers/authentication.controller';
import {
	createUser,
	deleteUser,
	updateMe,
	getUsers,
	deleteMe,
} from '../controllers/user.controller';

const router = Router();

router.post('/login', login);
// 2. forget password route
//3. reset password route

router.use(guard);
router.patch('/update-password', updatePassword);
router.patch('/update-me', updateMe);
router.delete('/delete-me', deleteMe);

//1.  permintions: admin to use the following routes

router.post('/create-user', createUser);
router.get('/get-users', getUsers);
router.delete('/delete-user/:id', deleteUser);

export default router;
