import express, { Request, Response } from 'express';
import { CustomError } from '../utils/custom-error';

export default (
	err: CustomError,
	req: Request,
	res: Response,
	next: express.NextFunction
) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	if (process.env.NODE_ENV === 'development') devError(res, err);
	if (process.env.NODE_ENV === 'production') prodError(res, err);
};

const devError = (res: Response, err: CustomError) => {
	console.error(err);
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		err,
	});
};
const prodError = (res: Response, err: CustomError) => {
	let error = Object.create(err);
	if (
		error.message ===
		'SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email'
	) {
		error = new CustomError(
			'Email already exists. Please use different email',
			400
		);
	}
	if (error.isOperational) {
		res.status(error.statusCode).json({
			status: error.status,
			message: error.message,
		});
	} else {
		res.status(500).json({
			status: 'error',
			message: 'Something went wrong',
		});
	}
};
