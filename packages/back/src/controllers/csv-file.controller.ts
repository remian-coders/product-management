import express, { Request, Response, Router } from 'express';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { writeFile } from 'fs/promises';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { catchAsyncError } from './utils/catch-async-error';
import { CustomError } from '../utils/custom-error';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { date } from '../utils/date';

export const addPath = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const { path: csvFolder } = req.body;
		console.log('******', csvFolder);
		console.log('******', req.body);
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
		if (!req.file)
			return next(
				new CustomError(
					'No file uploaded. Please upload a CSV file.',
					400
				)
			);
		const { buffer } = req.file;

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
		const twoDigitDate = ('0' + now.getDate()).slice(-2);
		const twoDigitMonth = ('0' + (now.getMonth() + 1)).slice(-2);
		const year = now.getFullYear();
		const fullPath =
			filePath.path +
			`/realizari_${twoDigitDate}_${twoDigitMonth}_${year}.csv`;
		await writeFile(fullPath, buffer);
		const workingHoursRepo = new WorkingHoursRepository();
		await workingHoursRepo.updateWorkingHours({
			date: date().today,
			from: new Date(`${date().currentDayStr} 00:00:00`),
			to: new Date(
				`${date().currentDayStr} ${date().currentHour}:${
					date().currentMinute
				}`
			),
			type: 'today',
		});
		res.status(200).json({
			status: 'success',
			message: 'File uploaded successfully',
		});
	}
);
