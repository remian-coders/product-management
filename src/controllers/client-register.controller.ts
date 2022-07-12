import { v4 as uuidv4 } from 'uuid';
import express, { Request, Response, Router } from 'express';
import { ClientRegisterRepository } from '../repository/client-register.repository';
import { ClientRegister } from '../entities/client-register.entity';

export class ClientRegisterController {
	clientRegisterRepo: ClientRegisterRepository;
	constructor() {
		this.clientRegisterRepo = new ClientRegisterRepository();
	}
	async createRegister(req: Request, next: express.NextFunction) {
		const registerType = req.params.registerType;
		const { ticketNo, cost, paymentType, others } = req.body;
		const register: ClientRegister = {
			id: uuidv4(),
			ticketNo,
			cost,
			paymentType,
			registerType,
			date: new Date(Date.now() - 24 * 60 * 60 * 1000),
			others,
		};
		return await this.clientRegisterRepo.save(register);
	}
	async findDailyRegister(req: Request, next: express.NextFunction) {
		const today = new Date();
		const date = new Date(
			today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate()
		);

		const dailyRegister = await this.clientRegisterRepo.findDailyRegister(
			date
		);
		console.log(dailyRegister);
		return dailyRegister;
	}
}
