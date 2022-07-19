import { v4 as uuidv4 } from 'uuid';
import express, { Request, Response, Router } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { RegisterRepository } from '../repository/register.repository';

export const createClientRegister = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const registerType = req.params.registerType;
		const { ticketNo, cost, paymentType, others } = req.body;
		const register = {
			ticketNo,
			cost,
			paymentType,
			registerType,
			admin: null,
			date: new Date(Date.now()),
			others,
		};
		const registerRepo = new RegisterRepository();
		await registerRepo.save(register);
		res.status(200).json({
			message: 'Register created',
		});
	}
);

export const getDailyClientRegister = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const now = new Date();
		const date = new Date(
			now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
		);
		const registerRepo = new RegisterRepository();
		const registers = await registerRepo.findDailyClientRegister(date);
		res.status(200).json({
			message: 'Daily Client Register',
			data: { registers },
		});
	}
);

export const createAdminRegister = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const registerType = req.params.registerType;
		const { ticketNo, cost, paymentType, others } = req.body;
		const register = {
			ticketNo,
			cost,
			paymentType,
			registerType,
			admin: req.user.name,
			date: new Date(Date.now()),
			others,
		};
		const registerRepo = new RegisterRepository();
		await registerRepo.save(register);
		const now = new Date();
		const date = new Date(
			now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
		);
		res.status(200).json({
			message: 'Register created',
		});
	}
);

export const getDailyAdminRegister = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const now = new Date();
		const date = new Date(
			now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
		);
		const registerRepo = new RegisterRepository();
		const registers = await registerRepo.findDailyAdminRegister(date);
		res.status(200).json({
			message: 'Daily Client Register',
			data: { registers },
		});
	}
);

export const isRegisterClosed = (
	req: Request,
	res: Response,
	next: express.NextFunction
) => {
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
	next();
};
