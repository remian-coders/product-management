import express, { Request, Response, Router } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { RegisterRepository } from '../repository/register.repository';
import { IPRepository } from '../repository/ip.repository';
import { CustomError } from '../utils/custom-error';

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
		const dateStr =
			(req.query.date as string) ||
			now.getFullYear() +
				'-' +
				(now.getMonth() + 1) +
				'-' +
				now.getDate();
		const from = new Date(dateStr);
		const to = new Date(
			`${from.getFullYear()}-${
				from.getMonth() + 1
			}-${from.getDate()} 23:59:00`
		);
		const registerRepo = new RegisterRepository();
		const registers = await registerRepo.findDailyClientRegister(from, to);
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
		const dateStr =
			(req.query.date as string) ||
			now.getFullYear() +
				'-' +
				(now.getMonth() + 1) +
				'-' +
				now.getDate();
		const from = new Date(dateStr);
		const to = new Date(
			`${from.getFullYear()}-${
				from.getMonth() + 1
			}-${from.getDate()} 23:59:00`
		);
		const registerRepo = new RegisterRepository();
		const registers = await registerRepo.findDailyAdminRegister(from, to);
		res.status(200).json({
			message: 'Daily Client Register',
			data: { registers },
		});
	}
);

export const isAvailable = async (
	req: Request,
	res: Response,
	next: express.NextFunction
) => {
	const ipRepo = new IPRepository();
	const ip = req.ip;
	const isAllowedIP = await ipRepo.findByIP(ip);
	console.log(isAllowedIP);
	if (!isAllowedIP) {
		return next(new CustomError('IP not allowed', 403));
	}
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
		return next(
			new CustomError('The page is available between 8:00 and 18:15', 400)
		);
	}
	next();
};
