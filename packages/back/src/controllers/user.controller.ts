import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { UsersRepository } from '../repository/users.repository';
import { CustomError } from '../utils/custom-error';
import { catchAsyncError } from './utils/catch-async-error';

export const createUser = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return next(
				new CustomError(
					'You should provide name, email, and password to create a new user!',
					400
				)
			);
		}
		const hash = await bcryptjs.hash(password, 8);
		const usersRepo = new UsersRepository();
		const user = await usersRepo.create({
			id: uuid4(),
			name,
			email,
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
	const users = await usersRepo.getAll(id, [
		'user.id',
		'user.name',
		'user.email',
	]);

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
			return next(
				new CustomError(
					`Please go ${req.protocol}://${req.get(
						'host'
					)}/admin/delete-me to delete your account!`,
					400
				)
			);
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
