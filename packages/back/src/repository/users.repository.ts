import { Not, Repository } from 'typeorm';
import dataSource from '../data-source';
import { User } from '../entities/users.entity';

export class UsersRepository {
	usersRepo: Repository<User>;
	constructor() {
		this.usersRepo = dataSource.getRepository(User);
	}
	async getAll() {
		return await this.usersRepo.find({
			where: { email: Not('admin@gmail.com') },
			select: ['id', 'email', 'name', 'role'],
		});
	}
	async findOne(query: object) {
		return await this.usersRepo.findOne(query);
	}
	async update(id: string, user: Partial<User>) {
		return await this.usersRepo.update(id, user);
	}
	async create(users: User) {
		return await this.usersRepo.save(users);
	}
	async delete(id: string) {
		return await this.usersRepo.delete(id);
	}
}
