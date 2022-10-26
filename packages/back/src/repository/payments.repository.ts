import { Repository, Between, IsNull, Not } from 'typeorm';
import { Payment } from '../entities/payments.entity';
import dataSource from '../data-source';

export class PaymentsRepository {
	paymentsRepo: Repository<Payment>;
	constructor() {
		this.paymentsRepo = dataSource.getRepository(Payment);
	}

	async makePayment(payment: Payment) {
		return await this.paymentsRepo.save(payment);
	}

	async findDailyClientPayments(from: Date, to: Date) {
		const payments = await this.paymentsRepo.find({
			where: {
				date: Between(from, to),
				admin: IsNull(),
			},
			relations: {
				register: true,
			},
		});
		const { cash, card } = await this.getSum(from, to, false);
		return { payments, cash, card };
	}

	async findAdminPayments(from: Date, to: Date) {
		const payments = await this.paymentsRepo.find({
			where: {
				admin: Not(IsNull()),
				date: Between(from, to),
			},
			relations: {
				register: true,
			},
		});
		const { cash, card } = await this.getSum(from, to, true);
		return { payments, cash, card };
	}

	async findAllPayments(from: Date, to: Date) {
		const payments = await this.paymentsRepo.find({
			where: {
				date: Between(from, to),
			},
			relations: {
				register: true,
			},
		});
		const { cash: cashAdmin, card: cardAdmin } = await this.getSum(
			from,
			to,
			true
		);
		const { cash: cashClient, card: cardClient } = await this.getSum(
			from,
			to,
			false
		);
		const cash = cashAdmin + cashClient;
		const card = cardAdmin + cardClient;
		return { payments, cash, card };
	}

	async getSum(from: Date, to: Date, isAdmin: boolean) {
		let isAdminNull = isAdmin ? 'NOT' : '';
		const { cash } = await this.paymentsRepo
			.createQueryBuilder('payment')
			.select('SUM(payment.paymentAmount)', 'cash')
			.where('payment.date BETWEEN :from AND :to', { from, to })
			.andWhere(`payment.admin IS ${isAdminNull} NULL`)
			.andWhere('payment.paymentType = :paymentType', {
				paymentType: 'cash',
			})
			.getRawOne();
		const { card } = await this.paymentsRepo
			.createQueryBuilder('payment')
			.select('SUM(payment.paymentAmount)', 'card')
			.where('payment.date BETWEEN :from AND :to', { from, to })
			.andWhere(`payment.admin IS ${isAdminNull} NULL`)
			.andWhere('payment.paymentType = :paymentType', {
				paymentType: 'card',
			})
			.getRawOne();
		return { cash, card };
	}
}
