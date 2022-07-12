import { Repository } from 'typeorm';
import dataSource from '../data-source';
import { ClientRegister } from '../entities/client-register.entity';

export class ClientRegisterRepository {
	clientRegisterRepo: Repository<ClientRegister>;
	constructor() {
		this.clientRegisterRepo = dataSource.getRepository(ClientRegister);
	}
	async save(clientRegister: ClientRegister) {
		return await this.clientRegisterRepo.save(clientRegister);
	}
	async findDailyRegister(date: Date) {
		return await this.clientRegisterRepo
			.createQueryBuilder('clientRegister')
			.where('clientRegister.date >= :date', { date })
			.getMany();
	}
}
