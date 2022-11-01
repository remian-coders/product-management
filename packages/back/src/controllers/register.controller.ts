import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { RegisterRepository } from '../repository/register.repository';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { PaymentsRepository } from '../repository/payments.repository';
import { CustomError } from '../utils/custom-error';
import { date } from '../utils/date';

export const createRegister = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const registerType = req.body.registerType;
		const cost = req.body.cost ? req.body.cost * 1 : 0;
		let paymentAmount = req.body.paymentAmount
			? req.body.paymentAmount * 1
			: 0;
		let paymentType = req.body.paymentType;
		let ticketNo = req.body.ticketNo;
		const others = req.body.others;
		const admin = req.user.role === 'admin' ? req.user.name : null;
		let paymentStatus: 'complete' | 'incomplete' = 'complete';
		if (cost === 0) return next(new CustomError('Cost cannot be 0!', 400));
		if (registerType === 'service') {
			if (cost > paymentAmount) paymentStatus = 'incomplete';
			else if (cost === paymentAmount) paymentStatus = 'complete';
			else
				return next(
					new CustomError(
						`You cannot receive more than the cost: ${cost}`,
						400
					)
				);
		} else if (registerType === 'expense') {
			ticketNo = null;
			paymentAmount = cost;
			paymentType = 'cash';
		} else if (registerType === 'accessory') {
			ticketNo = null;
			paymentAmount = cost;
		}
		const register = {
			ticketNo,
			cost,
			paymentStatus,
			registerType,
			date: new Date(),
			payments: [],
		};
		const registerRepo = new RegisterRepository();
		const newRegister = await registerRepo.create(register);
		const payment = {
			paymentType: paymentType,
			paymentAmount: paymentAmount,
			admin,
			register: newRegister,
			date: new Date(),
			others,
		};
		const paymentsRepo = new PaymentsRepository();
		const newPayment = await paymentsRepo.makePayment(payment);
		res.status(200).json({
			message: 'New register is created!',
			data: { newPayment },
		});
	}
);

export const getByTicket = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const ticketNo = req.params.ticketNo;
		const registerRepo = new RegisterRepository();
		const register = await registerRepo.findByIdTicketNo(ticketNo);
		res.status(200).json({
			message: 'Register',
			data: {
				register,
			},
		});
	}
);

export const isAvailable = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
