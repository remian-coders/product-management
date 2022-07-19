import { Repository, IsNull, Not, Raw } from 'typeorm';
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
	async findDailyClientRegister(date: Date) {
		return await this.registerRepo.find({
			where: {
				date: Raw((alias) => `${alias} >= :date`, { date }),
				admin: IsNull(),
			},
		});
	}
	async findDailyAdminRegister(date: Date) {
		return await this.registerRepo.findBy({
			date: Raw((alias) => `${alias} > :date`, { date }),
			admin: Not(IsNull()),
		});

		// .createQueryBuilder('register')
		// .where('register.date >= :date', { date })
		// .andWhere('register.adminName IS NOT NULL')
		// .getMany();
	}
}
