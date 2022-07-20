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
		return await this.registerRepo.find({
			where: {
				date: Between(from, to),
				admin: IsNull(),
			},
		});
	}
	async findDailyAdminRegister(from: Date, to: Date) {
		return await this.registerRepo.findBy({
			date: Between(from, to),
			admin: Not(IsNull()),
		});

		// .createQueryBuilder('register')
		// .where('register.date >= :date', { date })
		// .andWhere('register.adminName IS NOT NULL')
		// .getMany();
	}
}
