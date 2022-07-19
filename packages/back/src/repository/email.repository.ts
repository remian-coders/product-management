import { Email } from '../entities/email.enitity';
import { Repository } from 'typeorm';
import dataSource from '../data-source';

export class EmailRepository {
	emailRepository: Repository<Email>;
	constructor() {
		this.emailRepository = dataSource.getRepository(Email);
	}

	async save(email: Email) {
		return await this.emailRepository.save(email);
	}
	async findAll() {
		return await this.emailRepository.find();
	}
	async deleteById(id) {
		return await this.emailRepository.delete(id);
	}
}
