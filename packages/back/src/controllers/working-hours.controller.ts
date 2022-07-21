import express, { Request, Response } from 'express';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { catchAsyncError } from './utils/catch-async-error';
import { CustomError } from '../utils/custom-error';

export const updateWorkingHours = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const workingHoursRepo = new WorkingHoursRepository();
		const { startingHour, startingMinut, endingHour, endingMinut } =
			req.body;
		if (!startingHour || !startingMinut || !endingHour || !endingMinut) {
			return next(new CustomError('Please provide all the fields', 400));
		}
		if (
			startingHour > endingHour ||
			(startingHour === endingHour && startingMinut >= endingMinut)
		) {
			return next(
				new CustomError(
					'Starting hour must be before ending hour!',
					400
				)
			);
		}
		const newWorkingHours = {
			startingHour: startingHour as number,
			startingMinute: startingMinut as number,
			endingHour: endingHour as number,
			endingMinute: endingMinut as number,
		};
		const updatedWorkingHours = await workingHoursRepo.updateWorkingHours(
			newWorkingHours
		);
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
			data: workingHours,
		});
	}
);
