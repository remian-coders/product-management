import express, { Request, Response } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { EmailRepository } from '../repository/email.repository';
import { UsersRepository } from '../repository/users.repository';
import { IPRepository } from '../repository/ip.repository';
import { CsvPathRepository } from '../repository/csv-path.repository';
export const getAdminPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		res.render('base');
	}
);

export const userConfigPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const usersRepo = new UsersRepository();
		const users = await usersRepo.getAll(['id', 'email']);
		res.render('user-config', { users });
	}
);

export const emailConfigPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const emailRepo = new EmailRepository();
		const emails = await emailRepo.findAll();
		res.render('email-config', {
			emails,
		});
	}
);

export const ipConfigPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const ipRepo = new IPRepository();
		const ips = await ipRepo.findAll();
		res.render('ip-config', {
			ips,
		});
	}
);

export const passwordUpdatePage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		res.render('password-update');
	}
);

export const csvFileConfigPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const csvPathRepo = new CsvPathRepository();
		const path = csvPathRepo.getPath();
		res.render('csv-file-config', { path });
	}
);
