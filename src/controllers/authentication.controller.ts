import bcryptjs from 'bcryptjs';
import express, { Request, Response } from 'express';
import { UsersRepository } from '../repository/users.repository';
import { CustomError } from '../utils/custom-error';
import { jwtSign, jwtVerify } from './utils/jwt';
import { catchAsyncError } from './utils/catch-async-error';

export const login = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const usersRepo = new UsersRepository();
		const { email, password } = req.body;
		if (!email || !password)
			return next(
				new CustomError('Please provide email and password', 400)
			);
		const user = await usersRepo.findOne({ email });
		if (!user || !(await bcryptjs.compare(password, user.password)))
			return next(
				new CustomError('You provided wrong email or password!', 400)
			);
		const token = await jwtSign(user.id);
		user.password = undefined;
		user.passwordChangedAt = undefined;
		res.status(200).json({
			status: 'success',
			message: 'Logged in',
			token,
			data: { user },
		});
	}
);

export const updatePassword = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const usersRepo = new UsersRepository();
		const { oldPassword, newPassword } = req.body;
		if (!oldPassword || !newPassword)
			return next(
				new CustomError('Please provide old and new password', 400)
			);
		const user = await usersRepo.findOne({ id: req.user.id });
		const isCorrectPwd = await bcryptjs.compare(oldPassword, user.password);
		if (!isCorrectPwd)
			return next(new CustomError('Your password is not correct!', 400));
		user.password = await bcryptjs.hash(newPassword, 8);
		user.passwordChangedAt = new Date();
		await usersRepo.update(user.id, user);
		const token = await jwtSign(user.id);
		user.passwordChangedAt = undefined;
		user.password = undefined;
		res.status(200).json({
			status: 'success',
			message: 'Password updated',
			token,
			data: {},
		});
	}
);

export const guard = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const usersRepo = new UsersRepository();
		const { authorization } = req.headers;
		let token: string;
		if (authorization && authorization.startsWith('Bearer'))
			token = authorization.split(' ')[1];
		if (!token)
			return next(
				new CustomError(
					'You are not logged in! Please log in first.',
					401
				)
			);
		const decoded = await jwtVerify(token);
		const user = await usersRepo.findOne({ id: decoded.id });
		if (!user)
			return next(
				new CustomError('The user does not longer exist!', 401)
			);
		if (Date.parse(`${user.passwordChangedAt}`) / 1000 > decoded.iat) {
			return next(new CustomError('Please login again!', 401));
		}
		user.passwordChangedAt = undefined;
		req.user = user;
		next();
	}
);
