import { Repository } from 'typeorm';
import dataSource from '../data-source';
import { Accessory } from '../entities/accessoreis.entity';

export class AccessoriesRepository {
	accessoryRepo: Repository<Accessory>;
	constructor() {
		this.accessoryRepo = dataSource.getRepository(Accessory);
	}
	async create(accessory: Accessory) {
		return await this.accessoryRepo.save(accessory);
	}

	async find(query: {}) {
		return await this.accessoryRepo.find({
			where: query,
			relations: { category: true },
		});
	}
	async findOne(id) {
		return await this.accessoryRepo.findOne({
			where: { id },
			relations: { category: true },
		});
	}

	async getBrands(categoryId: string) {
		const brands = await this.accessoryRepo
			.createQueryBuilder('accessory')
			.select('brand')
			.where('categoryId = :categoryId', { categoryId })
			.groupBy('brand')
			.getRawMany();
		return brands;
	}

	async update(accessory: Accessory) {
		return await this.accessoryRepo.save(accessory);
	}
	async delete(id) {
		return await this.accessoryRepo.delete(id);
	}
}
