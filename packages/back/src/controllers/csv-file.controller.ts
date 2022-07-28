import express, { Request, Response, Router } from 'express';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { writeFile } from 'fs/promises';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { catchAsyncError } from './utils/catch-async-error';
import { CustomError } from '../utils/custom-error';
import { job } from '../cron-job/job';

export const addPath = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const { path: csvFolder } = req.body;
		console.log('******', csvFolder);
		const isExist = await access(csvFolder, constants.R_OK | constants.W_OK)
			.then(() => true)
			.catch(() => false);
		if (!isExist) {
			return next(
				new CustomError('The path you provided does not exist!', 400)
			);
		}
		const csvPathRepo = new CsvPathRepository();
		const updatedPath = await csvPathRepo.updatePath(csvFolder);
		res.status(200).json({
			status: 'success',
			message: 'Path updated successfully',
			data: {
				path: updatedPath,
			},
		});
	}
);

export const getPath = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const csvPathRepo = new CsvPathRepository();
		const path = await csvPathRepo.getPath();
		res.status(200).json({
			status: 'success',
			message: 'Path retrieved successfully',
			data: { path },
		});
	}
);

export const uploadFile = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const csvPathRepo = new CsvPathRepository();
		const filePath = await csvPathRepo.getPath();
		if (!filePath) {
			return next(
				new CustomError(
					'CSV file folder path is not defined. Please define it first ',
					400
				)
			);
		}
		const now = new Date();
		const date = ('0' + now.getDate()).slice(-2);
		const month = ('0' + (now.getMonth() + 1)).slice(-2);
		const year = now.getFullYear();
		const fullPath =
			filePath.path + `/realizari_${date}_${month}_${year}.csv`;
		const { buffer } = req.file;
		await writeFile(fullPath, buffer);
		job();
		res.status(200).json({
			status: 'success',
			message: 'File uploaded successfully',
		});
	}
);
