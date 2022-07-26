import express, { Request, Response, Router } from 'express';
import { Address4, Address6 } from 'ip-address';
import { catchAsyncError } from './utils/catch-async-error';
import { RegisterRepository } from '../repository/register.repository';
import { IPRepository } from '../repository/ip.repository';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { CustomError } from '../utils/custom-error';

export const createRegister = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		let { ticketNo, cost, paymentType, others } = req.body;
		const registerType = cost >= 0 ? 'income' : 'expense';
		paymentType = cost <= 0 ? 'cash' : paymentType;
		const admin = req.user ? req.user.name : null;
		const register = {
			ticketNo,
			cost,
			paymentType,
			registerType,
			admin,
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
		console.log('user ip address *******', req.ip);
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
			}-${from.getDate()} 23:59:59`
		);
		const registerRepo = new RegisterRepository();
		const { registers, card, cash } =
			await registerRepo.findDailyClientRegister(from, to);
		res.status(200).json({
			message: 'Daily Client Register',
			data: { registers, report: { card, cash } },
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
		const { registers, cash, card } =
			await registerRepo.findDailyAdminRegister(from, to);
		res.status(200).json({
			message: 'Daily Client Register',
			data: { registers, report: { card, cash } },
		});
	}
);

export const isAvailable = async (
	req: Request,
	res: Response,
	next: express.NextFunction
) => {
	console.log('socket ip', req.socket.remoteAddress);
	console.log('****req.ip***', req.ip);
	const ipRepo = new IPRepository();
	const ip = req.ip;
	const isAllowedIP = await ipRepo.findByIP(ip);
	if (!isAllowedIP) {
		return next(new CustomError('IP not allowed', 403));
	}

	// const workingHoursRepo = new WorkingHoursRepository();
	// const { startingHour, endingHour, startingMinute, endingMinute } =
	// 	await workingHoursRepo.getWorkingHours();
	// const now = new Date();
	// const currentHour = now.getHours();
	// const currentMinute = now.getMinutes();
	// if (
	// 	currentHour < startingHour ||
	// 	currentHour > endingHour ||
	// 	(currentHour === startingHour && startingMinute > currentMinute) ||
	// 	(currentHour === endingHour && currentMinute > endingMinute)
	// ) {
	// 	return next(
	// 		new CustomError(
	// 			`The page is available between ${startingHour}:${startingMinute} - ${endingHour}:${endingMinute}`,
	// 			503
	// 		)
	// 	);
	// }
	next();
};
