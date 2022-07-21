import express, { Request, Response } from 'express';
import { Email } from '../entities/email.enitity';
import { EmailRepository } from '../repository/email.repository';
import { catchAsyncError } from './utils/catch-async-error';

export const addEmail = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const emailRepo = new EmailRepository();
		const email: Email = {
			email: req.body.email,
		};
		await emailRepo.save(email);
		res.status(200).json({
			message: 'Email added successfully',
		});
	}
);

export const getEmails = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const emailRepo = new EmailRepository();
		const emails = await emailRepo.findAll();
		res.status(200).json({
			message: 'Emails fetched successfully',
			emails,
		});
	}
);

export const deleteEmail = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const emailRepo = new EmailRepository();
		const id = req.params.id;
		await emailRepo.deleteById(id);
		res.status(200).json({
			message: 'Email deleted successfully',
		});
	}
);
