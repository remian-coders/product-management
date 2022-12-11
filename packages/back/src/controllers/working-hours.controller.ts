import express, { Request, Response } from 'express';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { catchAsyncError } from './utils/catch-async-error';
import { CustomError } from '../utils/custom-error';
import { date } from '../utils/date';
import { CronStateRepository } from '../repository/cron-state.repository';
import { cronManager } from '../cron-job/cron-job';

export const updateWorkingHours = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const workingHoursRepo = new WorkingHoursRepository();
		let { from, to, type } = req.body;

		if (!from || !to || !type) {
			return next(new CustomError('Please provide all the fields', 400));
		}
		if (type !== 'today' && type !== 'daily') {
			return next(
				new CustomError('type value can only be today or daily', 400)
			);
		}
		from = new Date(`${date().currentDayStr} ${from}`);
		to = new Date(`${date().currentDayStr} ${to}`);
		if (from >= to) {
			return next(
				new CustomError(
					'Starting hour must be before ending hour!',
					400
				)
			);
		}
		const updatedWorkingHours = await workingHoursRepo.updateWorkingHours({
			date: date().today,
			from,
			to,
			type,
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

export const finalizeDay = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const workingHoursRepo = new WorkingHoursRepository();
		await workingHoursRepo.updateWorkingHours({
			date: date().today,
			from: new Date(date().today),
			to: new Date(
				`${date().currentDayStr} ${date().currentHour}:${
					date().currentMinute
				}`
			),
			type: 'today',
		});
		res.status(200).json({
			status: 'success',
			message: `Today's register is closed!`,
		});
	}
);

export const setTaskSchedulerState = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const state = req.body.state;
		const cronStateRepo = new CronStateRepository();
		if (!state) {
			return next(
				new CustomError(
					'Please provide a state to turn on and of the state of scheduler!',
					400
				)
			);
		}
		if (state === 'on') cronManager.start();
		else if (state === 'off') cronManager.stopAll();
		const taskSchedulerState = await cronStateRepo.setCronState(state);
		res.status(200).json({
			status: 'success',
			message: `Scheduler is ${taskSchedulerState.state}`,
		});
	}
);

export const getTaskSchedulerState = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const cronStateRepo = new CronStateRepository();
		const taskSchedulerState = await cronStateRepo.getCronState();
		res.status(200).json({
			status: 'success',
			message: `Scheduler is ${taskSchedulerState.state}`,
			data: {
				state: taskSchedulerState.state,
			},
		});
	}
);
