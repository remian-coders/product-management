import express, { Request, Response, Router } from 'express';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { parse } from 'csv-parse';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { catchAsyncError } from './utils/catch-async-error';
import { CustomError } from '../utils/custom-error';

export const addPath = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const { path } = req.body;
		const isExist = await access(path, constants.R_OK | constants.W_OK)
			.then(() => true)
			.catch(() => false);
		if (!isExist) {
			return next(
				new CustomError('The path you provided does not exist!', 400)
			);
		}
		const csvPathRepo = new CsvPathRepository();
		await csvPathRepo.updatePath(path);
		res.status(200).json({
			message: 'Path updated successfully',
		});
	}
);

export const uploadFile = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {}
);
