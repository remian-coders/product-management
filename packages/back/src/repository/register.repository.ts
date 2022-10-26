import { Repository, IsNull, Not, Raw, Between } from 'typeorm';
import dataSource from '../data-source';
import { Register } from '../entities/register.entity';

export class RegisterRepository {
	registerRepo: Repository<Register>;
	constructor() {
		this.registerRepo = dataSource.getRepository(Register);
	}
	async create(register: Register) {
		return await this.registerRepo.save(register);
	}

	async findByIdTicketNo(ticketNo: string) {
		const register = await this.registerRepo.findOne({
			relations: { payments: true },
			where: { ticketNo },
		});
		if (!register) return null;
		let paid = 0;
		register.payments.forEach((payment) => {
			paid += payment.paymentAmount;
		});
		const unPaid = register.cost - paid;
		return {
			...register,
			paid,
			unPaid,
		};
	}
	async update(id: number) {
		return await this.registerRepo.update(id, {
			paymentStatus: 'complete',
		});
	}
}
