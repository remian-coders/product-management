import dataSource from '../data-source';
import { FixedProducts } from '../entities/fixed-products.entity';
import { Repository } from 'typeorm';

export class FixedProductsRepository {
	fixedProductsRepo: Repository<FixedProducts>;
	constructor() {
		this.fixedProductsRepo = dataSource.getRepository(FixedProducts);
	}
	async getAll() {
		return await this.fixedProductsRepo.find();
	}
	async getById(id: string) {
		return await this.fixedProductsRepo.findOneBy({ id });
	}
	async create(fixedProducts: FixedProducts) {
		return await this.fixedProductsRepo.save(fixedProducts);
	}
	async delete(id: string) {
		return await this.fixedProductsRepo.delete(id);
	}
}
