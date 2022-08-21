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
		if (cost === 0) return next(new CustomError('Cost cannot be 0', 400));
		const registerType = cost > 0 ? 'income' : 'expense';
		paymentType = cost < 0 ? 'cash' : paymentType;
		ticketNo = cost < 0 ? null : ticketNo;
		let admin: string;
		if (req.user.role === 'admin') admin = req.user.name;
		else admin = null;
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
		const registerRepo = new RegisterRepository();
		const { registers, card, cash } =
			await registerRepo.findDailyClientRegister(from, to);
		res.status(200).json({
			message: 'Daily Client Register',
			data: { registers, report: { card, cash } },
		});
	}
);

export const getAdminRegister = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const fromStr = (req.query.from as string) || date().today;
		const from = new Date(fromStr);
		const toStr = req.query.to
			? (req.query.to as string) + ' 23:59:59'
			: `${from.getFullYear()}-${
					from.getMonth() + 1
			  }-${from.getDate()} 23:59:59`;
		const to = new Date(toStr);
		const registerRepo = new RegisterRepository();
		const { registers, cash, card } = await registerRepo.findAdminRegister(
			from,
			to
		);
		res.status(200).json({
			message: 'Client Register',
			data: { registers, report: { card, cash } },
		});
	}
);

export const getAllRegister = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const fromStr = (req.query.from as string) || date().today;
		const from = new Date(fromStr);
		const toStr = req.query.to
			? (req.query.to as string) + ' 23:59:59'
			: `${from.getFullYear()}-${
					from.getMonth() + 1
			  }-${from.getDate()} 23:59:59`;
		const to = new Date(toStr);
		const registerRepo = new RegisterRepository();
		const { registers, cash, card } = await registerRepo.findAllRegister(
			from,
			to
		);
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
	// const ipRepo = new IPRepository();
	// const ip = req.ip;
	// console.log(ip);
	// const isAllowedIP = await ipRepo.findByIP(ip);
	// if (!isAllowedIP) {
	// 	return next(new CustomError('IP not allowed', 403));
	// }

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
