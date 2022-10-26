import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { PaymentsRepository } from '../repository/payments.repository';
import { RegisterRepository } from '../repository/register.repository';
import { CustomError } from '../utils/custom-error';

export const makePayment = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { ticketNo, paymentType, paymentAmount } = req.body;
		if (!ticketNo) {
			return next(
				new CustomError('A payment should belong to a register!', 400)
			);
		}
		if (!paymentAmount || !paymentType) {
			return next(
				new CustomError(
					'Please provide payment amount and payment type.',
					400
				)
			);
		}
		const registerRepo = new RegisterRepository();
		const register = await registerRepo.findByIdTicketNo(ticketNo);
		if (!register) {
			return next(
				new CustomError(
					'Register with the provided ticket number is not found!',
					400
				)
			);
		}
		if (register.payments[0].admin && req.user.role != 'admin') {
			return next(
				new CustomError(
					'The payment for this register must be done by the admins!',
					400
				)
			);
		} else if (!register.payments[0].admin && req.user.role != 'cashier') {
			return next(
				new CustomError(
					'The payment for this register must be done by the cashier',
					400
				)
			);
		}
		if (paymentAmount > register.unPaid) {
			return next(
				new CustomError(
					'You cannot receive more than unpaid amount.',
					400
				)
			);
		} else if (paymentAmount === register.unPaid) {
			await registerRepo.update(register.id);
			register.paymentStatus = 'complete';
		}
		register.payments = undefined;
		register.paid += paymentAmount;
		register.unPaid -= paymentAmount;
		const admin = req.user.role === 'admin' ? req.user.name : null;
		const paymentsRepo = new PaymentsRepository();
		const payment = await paymentsRepo.makePayment({
			paymentType,
			paymentAmount,
			date: new Date(),
			admin,
			register,
		});
		res.status(200).json({
			message: 'Success!',
			data: {
				payment,
			},
		});
	}
);

export const getDailyClientPayments = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const from = new Date();
		from.setHours(0, 0, 0, 0);
		const to = new Date();
		to.setHours(23, 59, 59);
		console.log(from.toString(), to.toString());
		const paymentsRepo = new PaymentsRepository();
		const { payments, cash, card } =
			await paymentsRepo.findDailyClientPayments(from, to);
		res.status(200).json({
			message: 'Cashier registered payments!',
			data: { payments, report: { cash, card } },
		});
	}
);

export const getAdminPayments = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const fromStr = (req.query.from as string) || new Date();
		const from = new Date(fromStr);
		from.setHours(0, 0, 0, 0);
		const toStr = (req.query.to as string) || new Date();
		const to = new Date(toStr);
		to.setHours(23, 59, 59);
		const paymentsRepo = new PaymentsRepository();
		const { payments, cash, card } = await paymentsRepo.findAdminPayments(
			from,
			to
		);
		res.status(200).json({
			message: 'Admin registered payments!',
			data: { payments, report: { card, cash } },
		});
	}
);

export const getAllPayments = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const fromStr = (req.query.from as string) || new Date();
		const from = new Date(fromStr);
		from.setHours(0, 0, 0, 0);
		const toStr = (req.query.to as string) || new Date();
		const to = new Date(toStr);
		to.setHours(23, 59, 59);
		const paymentsRepo = new PaymentsRepository();
		const { payments, card, cash } = await paymentsRepo.findAllPayments(
			from,
			to
		);
		res.status(200).json({
			message: 'Admin and Cashier registered payments!',
			data: { payments, report: { card, cash } },
		});
	}
);
