import express, { Request, Response, Router } from 'express';
import { ClientRegisterController } from '../controllers/client-register.controller';
const router = Router();

router.post(
	'/:registerType',
	async (req: Request, res: Response, next: express.NextFunction) => {
		const now = new Date();
		const closingTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			18,
			15,
			0
		);
		if (now > closingTime) {
			res.status(400).send('Daily register is closed');
			return;
		}
		const clientRegisterController = new ClientRegisterController();
		const clientRegister = await clientRegisterController.createRegister(
			req,
			next
		);
		res.status(201).json(clientRegister);
	}
);

router.get(
	'/',
	async (req: Request, res: Response, next: express.NextFunction) => {
		const clientRegisterController = new ClientRegisterController();
		const dailyRegister = await clientRegisterController.findDailyRegister(
			req,
			next
		);
		res.status(200).json(dailyRegister);
	}
);

export default router;
