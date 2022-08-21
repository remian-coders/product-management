import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { UsersRepository } from '../repository/users.repository';
import { CustomError } from '../utils/custom-error';
import { catchAsyncError } from './utils/catch-async-error';

export const createUser = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const { name, email, password, role } = req.body;
		if (!name || !email || !password) {
			return next(
				new CustomError(
					'You should provide name, email, password, and role to create a new user!',
					400
				)
			);
		}
		if (role !== 'admin' && role !== 'cashier') {
			return next(
				new CustomError('Role should be admin or cashier!', 400)
			);
		}
		const hash = await bcryptjs.hash(password, 8);
		const usersRepo = new UsersRepository();
		const user = await usersRepo.create({
			id: uuid4(),
			name,
			email,
			role,
			password: hash,
		});
		user.password = undefined;
		user.passwordChangedAt = undefined;
		user.passwordResetExpires = undefined;
		user.passwordResetToken = undefined;
		res.status(201).json({
			message: 'User created successfully',
			data: {
				user,
			},
		});
	}
);

export const getUsers = catchAsyncError(async (req: Request, res: Response) => {
	const usersRepo = new UsersRepository();
	const id = req.user.id;
	const users = await usersRepo.getAll();

	res.status(200).json({
		message: 'Users fetched successfully',
		data: {
			users,
		},
	});
});

export const deleteUser = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		if (req.user.id === req.params.id) {
			return next(new CustomError(`You can't delete your account!`, 400));
		}
		const { id } = req.params;
		const usersRepo = new UsersRepository();
		await usersRepo.delete(id);
		res.status(200).json({
			message: 'User deleted successfully',
			data: {},
		});
	}
);
