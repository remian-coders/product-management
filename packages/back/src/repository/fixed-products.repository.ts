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

	async create(fixedProduct: FixedProducts) {
		const existingProduct = await this.fixedProductsRepo.findOneBy({
			id: fixedProduct.id,
		});
		if (existingProduct)
			fixedProduct = Object.assign(existingProduct, fixedProduct);
		return await this.fixedProductsRepo.save(fixedProduct);
	}
	async delete(id: string) {
		return await this.fixedProductsRepo.delete(id);
	}
}
