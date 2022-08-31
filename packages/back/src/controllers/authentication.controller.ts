import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { promisify } from 'util';
import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '../repository/users.repository';
import { CustomError } from '../utils/custom-error';
import { jwtSign, jwtVerify } from './utils/jwt';
import { catchAsyncError } from './utils/catch-async-error';
import { mail } from '../utils/mail';
export const login = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const usersRepo = new UsersRepository();
		const { email, password } = req.body;
		if (!email || !password)
			return next(
				new CustomError('Please provide email and password', 400)
			);
		const user = await usersRepo.findOne({
			select: ['id', 'name', 'password', 'email', 'role'],
			where: { email },
		});
		if (!user || !(await bcryptjs.compare(password, user.password)))
			return next(
				new CustomError('You provided wrong email or password!', 400)
			);
		const token = await jwtSign(user.id);
		user.password = undefined;
		res.status(200).json({
			status: 'success',
			message: 'Logged in',
			token,
			data: { user },
		});
	}
);

export const updatePassword = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const usersRepo = new UsersRepository();
		const { oldPassword, newPassword } = req.body;
		if (!oldPassword || !newPassword)
			return next(
				new CustomError('Please provide old and new password', 400)
			);
		const user = await usersRepo.findOne({
			select: ['id', 'name', 'password', 'email', 'role'],
			where: { id: req.user.id },
		});
		const isCorrectPwd = await bcryptjs.compare(oldPassword, user.password);
		if (!isCorrectPwd)
			return next(new CustomError('Your password is not correct!', 400));
		user.password = await bcryptjs.hash(newPassword, 8);
		user.passwordChangedAt = new Date();
		await usersRepo.update(user.id, user);
		const token = await jwtSign(user.id);
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
	async (req: Request, res: Response, next: NextFunction) => {
		const usersRepo = new UsersRepository();
		const { authorization } = req.headers;
		let token: string;
		if (authorization && authorization.startsWith('Bearer'))
			token = authorization.split(' ')[1];
		if (!token) {
			return next(
				new CustomError(
					'You are not logged in! Please log in first.',
					401
				)
			);
		}
		const decoded = await jwtVerify(token);
		const user = await usersRepo.findOne({ where: { id: decoded.id } });
		if (!user)
			return next(
				new CustomError(
					`You don't have an account please create an account.`,
					401
				)
			);
		if (Date.parse(`${user.passwordChangedAt}`) / 1000 > decoded.iat) {
			return next(new CustomError('Please login again!', 401));
		}
		user.passwordChangedAt = null;
		user.password = null;
		req.user = user;
		next();
	}
);
export const authorize = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new CustomError(
					`You don't have permission to access this route.`,
					403
				)
			);
		}
		return next();
	};
};

export const forgotPassword = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const usersRepo = new UsersRepository();
		const { email } = req.body;
		if (!email) return next(new CustomError('Please provide email', 400));
		const user = await usersRepo.findOne({
			where: { email },
		});
		if (!user) return next(new CustomError('User does not exist', 400));

		const randomBytes = (await promisify(crypto.randomBytes)(32)).toString(
			'hex'
		);
		const tempToken = crypto
			.createHash('sha256')
			.update(randomBytes)
			.digest('hex');
		await usersRepo.update(user.id, {
			passwordResetToken: tempToken,
			passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000),
		});
		let resetPwdLink: string;
		if (process.env.NODE_ENV === 'production') {
			resetPwdLink = `${req.protocol}://${req.get(
				'host'
			)}/login/recovery/${randomBytes}`;
		} else if (process.env.NODE_ENV === 'development') {
			resetPwdLink = `http://localhost:3000/login/recovery/${randomBytes}`;
		}
		const subject = 'Reset your password!';
		const html = `<p>Click here <a href="${resetPwdLink}">Reset Password</a> to reset your password.</p>\n<p>The link will expire after 10 minutes.</p>\n<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;
		await mail(email, subject, html);
		res.status(200).json({
			status: 'success',
			message:
				'Reset password link sent to your email. Please check your email.',
		});
	}
);

export const resetPassword = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { password, token: resetToken } = req.body;
		console.log(password, resetToken);
		if (!password)
			return next(new CustomError('Please provide password!', 400));
		if (!resetToken) return next(new CustomError('Please try again!', 400));
		const passwordResetToken = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex');
		const usersRepo = new UsersRepository();
		const user = await usersRepo.findOne({
			where: { passwordResetToken },
		});
		if (!user)
			return next(
				new CustomError('Invalid token! Please try again!', 400)
			);
		if (Date.parse(`${user.passwordResetExpires}`) < Date.now())
			return next(new CustomError('Url has expired!', 400));
		user.password = await bcryptjs.hash(req.body.password, 8);
		user.passwordResetToken = null;
		user.passwordResetExpires = null;
		user.passwordChangedAt = new Date();
		await usersRepo.update(user.id, user);
		const token = await jwtSign(user.id);
		user.password = undefined;
		user.passwordChangedAt = undefined;
		user.passwordResetExpires = undefined;
		user.passwordResetToken = undefined;
		res.status(200).json({
			status: 'success',
			message: 'Password updated',
			token,
			data: { user },
		});
	}
);
