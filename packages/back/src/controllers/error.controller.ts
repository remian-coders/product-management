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
	// console.error(err);
	if (err.message === '25') console.log('the error is here');
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		err,
	});
};
const prodError = (res: Response, err: CustomError) => {
	let error = Object.create(err);
	console.log(error);
	if (
		error.message ===
		'SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email'
	) {
		error = new CustomError(
			'Email already exists. Please use different email',
			400
		);
	}
	if (error.name === 'TokenExpiredError')
		error = new CustomError('You are not logged in, please log in.', 401);
	if (error.name === 'JsonWebTokenError')
		error = new CustomError('You are not logged in please log in.', 401);
	if (error.code === 'LIMIT_FILE_SIZE') {
		error = new CustomError(
			'File size should not be more than 100MG!',
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
