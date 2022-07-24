import express, { Request, Response } from 'express';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { catchAsyncError } from './utils/catch-async-error';
import { CustomError } from '../utils/custom-error';

export const updateWorkingHours = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const workingHoursRepo = new WorkingHoursRepository();
		let { from, to } = req.body;
		const now = new Date();

		if (!from || !to) {
			return next(new CustomError('Please provide all the fields', 400));
		}
		from = new Date(
			`${now.getFullYear()}-${
				now.getMonth() + 1
			}-${now.getDate()} ${from}`
		);
		to = new Date(
			`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${to}`
		);
		if (from > to) {
			return next(
				new CustomError(
					'Starting hour must be before ending hour!',
					400
				)
			);
		}
		const updatedWorkingHours = await workingHoursRepo.updateWorkingHours({
			from,
			to,
		});
		res.status(200).json({
			status: 'success',
			message: 'Working hours updated',
			data: updatedWorkingHours,
		});
	}
);

export const getWorkingHours = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const workingHoursRepo = new WorkingHoursRepository();
		const workingHours = await workingHoursRepo.getWorkingHours();
		res.status(200).json({
			status: 'success',
			message: 'Working hours retrieved',
			data: { workingHours },
		});
	}
);
