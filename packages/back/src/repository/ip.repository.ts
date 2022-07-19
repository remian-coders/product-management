import { Repository } from 'typeorm';
import { IP } from '../entities/ip.entity';
import dataSource from '../data-source';

export class IPRepository {
	ipRepository: Repository<IP>;
	constructor() {
		this.ipRepository = dataSource.getRepository(IP);
	}
	async save(ip: IP) {
		return await this.ipRepository.save(ip);
	}
	async findAll() {
		return await this.ipRepository.find();
	}
	async deleteById(id) {
		return await this.ipRepository.delete(id);
	}
}
