import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { RegisterRepository } from '../repository/register.repository';
import { IPRepository } from '../repository/ip.repository';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { CustomError } from '../utils/custom-error';
import { date } from '../utils/date';

export const createRegister = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
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
	async (req: Request, res: Response, next: NextFunction) => {
		const dateStr = date().today;
		const from = new Date(dateStr);
		const to = new Date(
			`${from.getFullYear()}-${
				from.getMonth() + 1
			}-${from.getDate()} 23:59:59`
		);
		console.log(from, to);
		const registerRepo = new RegisterRepository();
		// const { registers, card, cash } =
		// 	await registerRepo.findDailyClientRegister(from, to);
		res.status(200).json({
			message: 'Daily Client Register',
			// data: { registers, report: { card, cash } },
		});
	}
);

export const getDailyAdminRegister = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const now = new Date();
		const dateStr = (req.query.date as string) || date().today;

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

export const getDailyAllRegister = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const dateStr = (req.query.date as string) || date().today;
		const from = new Date(dateStr);
		const to = new Date(
			`${from.getFullYear()}-${
				from.getMonth() + 1
			}-${from.getDate()} 23:59:59`
		);
		const registerRepo = new RegisterRepository();
		const { registers, cash, card } =
			await registerRepo.findDailyAllRegister(from, to);
		res.status(200).json({
			message: 'Daily All Register',
			data: { registers, report: { card, cash } },
		});
	}
);

export const isAvailable = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const ipRepo = new IPRepository();
	const ip = req.ip;
	console.log(ip);
	const isAllowedIP = await ipRepo.findByIP(ip);
	if (!isAllowedIP) {
		return next(new CustomError('IP not allowed', 403));
	}

	const workingHoursRepo = new WorkingHoursRepository();
	const todaysWorkingHours = await workingHoursRepo.getTodaysWorkingHours();
	if (!todaysWorkingHours)
		return next(
			new CustomError('Working hours should be set from admin page!', 403)
		);
	const from = new Date(todaysWorkingHours.from);
	const to = new Date(todaysWorkingHours.to);
	const startingHour = from.getHours();
	const startingMinute = from.getMinutes();
	const endingHour = to.getHours();
	const endingMinute = to.getMinutes();
	const currentHour = date().currentHour;
	const currentMinute = date().currentMinute;
	if (
		currentHour < startingHour ||
		currentHour > endingHour ||
		(currentHour === startingHour && startingMinute > currentMinute) ||
		(currentHour === endingHour && currentMinute >= endingMinute)
	) {
		return next(
			new CustomError(
				`The page is available between ${startingHour}:${startingMinute} - ${endingHour}:${endingMinute}`,
				503
			)
		);
	}
	next();
};
