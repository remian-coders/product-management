import { Repository, IsNull, Not, Raw, Between } from 'typeorm';
import dataSource from '../data-source';
import { Register } from '../entities/register.entity';

export class RegisterRepository {
	registerRepo: Repository<Register>;
	constructor() {
		this.registerRepo = dataSource.getRepository(Register);
	}
	async save(register: Register) {
		return await this.registerRepo.save(register);
	}
	async findDailyClientRegister(from: Date, to: Date) {
		const { cash, card } = await this.getDailySum(from, to, false);
		const registers = await this.registerRepo.find({
			where: {
				date: Between(from, to),
				admin: IsNull(),
			},
		});
		return { registers, cash, card };
	}
	async getAll() {
		return await this.registerRepo.find();
	}
	async getDailySum(from: Date, to: Date, admin: boolean) {
		let isAdmin = '';
		if (admin) isAdmin = 'NOT';
		const { cash } = await this.registerRepo
			.createQueryBuilder('register')
			.select('SUM(register.cost)', 'cash')
			.where('register.date BETWEEN :from AND :to', { from, to })
			.andWhere(`register.admin IS ${isAdmin} NULL`)
			.andWhere('register.paymentType = :paymentType', {
				paymentType: 'cash',
			})
			.getRawOne();
		const { card } = await this.registerRepo
			.createQueryBuilder('register')
			.select('SUM(register.cost)', 'card')
			.where('register.date BETWEEN :from AND :to', { from, to })
			.andWhere(`register.admin IS ${isAdmin} NULL`)
			.andWhere('register.paymentType = :paymentType', {
				paymentType: 'card',
			})
			.getRawOne();
		return { cash, card };
	}
	async findDailyAdminRegister(from: Date, to: Date) {
		const { cash, card } = await this.getDailySum(from, to, true);
		const registers = await this.registerRepo.findBy({
			date: Between(from, to),
			admin: Not(IsNull()),
		});
		return { registers, cash, card };
	}
	async findDailyAllRegister(from: Date, to: Date) {
		const { cash: cashAdmin, card: cardAdmin } = await this.getDailySum(
			from,
			to,
			true
		);
		const { cash: cashClient, card: cardClient } = await this.getDailySum(
			from,
			to,
			false
		);
		const cash = cashAdmin + cashClient;
		const card = cardAdmin + cardClient;
		const registers = await this.registerRepo.find({
			where: {
				date: Between(from, to),
			},
		});
		return { registers, cash, card };
	}
	async findByIdTicketNo(ticketNo) {
		return await this.registerRepo.findOneBy({ ticketNo });
	}
}
