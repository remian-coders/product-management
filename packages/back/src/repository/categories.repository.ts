import { Repository } from 'typeorm';
import dataSource from '../data-source';
import { Category } from '../entities/categories.entity';

export class CategoriesRepository {
	categoryRepo: Repository<Category>;
	constructor() {
		this.categoryRepo = dataSource.getRepository(Category);
	}
	async create(category: Category) {
		return await this.categoryRepo.save(category);
	}
	async findOneBy(query: {}) {
		return await this.categoryRepo.findOneBy(query);
	}
	async findAll() {
		return await this.categoryRepo.find();
	}
	async update(category: Category) {
		return await this.categoryRepo.save(category);
	}
	async delete(id) {
		return await this.categoryRepo.delete(id);
	}
}
