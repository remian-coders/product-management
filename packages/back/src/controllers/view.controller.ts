import express, { Request, Response } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { EmailRepository } from '../repository/email.repository';
import { UsersRepository } from '../repository/users.repository';
import { IPRepository } from '../repository/ip.repository';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { RegisterRepository } from '../repository/register.repository';

export const registerPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const now = new Date();
		const date = new Date(
			now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
		);
		const registerRepo = new RegisterRepository();
		const registers = await registerRepo.findDailyClientRegister(date);
		res.render('register', { registers });
	}
);

export const getAdminPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		res.render('login');
	}
);

export const userConfigPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const usersRepo = new UsersRepository();
		const users = await usersRepo.getAll(['id', 'email']);
		res.render('user-config', { title: 'Add Admins', users });
	}
);

export const emailConfigPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const emailRepo = new EmailRepository();
		const emails = await emailRepo.findAll();
		res.render('email-config', {
			title: 'Email Config',
			emails,
		});
	}
);

export const ipConfigPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const ipRepo = new IPRepository();
		const ips = await ipRepo.findAll();
		res.render('ip-config', {
			title: 'IP Config',
			ips,
		});
	}
);

export const passwordUpdatePage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		res.render('password-update', { title: 'Password Update' });
	}
);

export const csvFileConfigPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const csvPathRepo = new CsvPathRepository();
		const path = csvPathRepo.getPath();
		res.render('csv-file-config', { path, title: 'CSV File Config' });
	}
);

export const forgotPasswordPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		res.render('forgot-password');
	}
);
export const resetPasswordPage = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		res.render('reset-password');
	}
);
