import express, { Request, Response } from 'express';
import { IPRepository } from '../repository/ip.repository';
import { catchAsyncError } from './utils/catch-async-error';
import { IP } from '../entities/ip.entity';

export const addIP = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const ipRepository = new IPRepository();
		const ip: IP = {
			ip: req.body.ip,
		};
		await ipRepository.save(ip);
		res.status(201).json({
			message: 'IP added successfully',
		});
	}
);

export const getIPs = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const ipRepository = new IPRepository();
		const ips = await ipRepository.findAll();
		res.status(200).json({
			message: 'IPs retrieved successfully',
			ips,
		});
	}
);

export const deleteIP = catchAsyncError(
	async (req: Request, res: Response, next: express.NextFunction) => {
		const ipRepository = new IPRepository();
		const { id } = req.params;
		await ipRepository.deleteById(id);
		res.status(200).json({
			message: 'IP deleted successfully',
		});
	}
);
