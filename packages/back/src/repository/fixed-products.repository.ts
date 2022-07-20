import { Repository } from 'typeorm';
import dataSource from '../data-source';
import { FixedProducts } from '../entities/fixed-products.entity';

export class FixedProductsRepository {
	fixedProductsRepo: Repository<FixedProducts>;
	constructor() {
		this.fixedProductsRepo = dataSource.getRepository(FixedProducts);
	}
	async getAll() {
		return await this.fixedProductsRepo.find();
	}

	async create(fixedProducts: FixedProducts) {
		return await this.fixedProductsRepo.save(fixedProducts);
	}
	async delete(id: string) {
		return await this.fixedProductsRepo.delete(id);
	}
}