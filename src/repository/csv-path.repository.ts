import dataSource from '../data-source';
import { CsvPath } from '../entities/csv-path.entity';
import { Repository } from 'typeorm';

export class CsvPathRepository {
	csvPathRepo: Repository<CsvPath>;
	constructor() {
		this.csvPathRepo = dataSource.getRepository(CsvPath);
	}
	async updatePath(path: string) {
		const csvPath = await this.csvPathRepo.findOneBy({ id: 1 });
		csvPath.path = path;
		return await this.csvPathRepo.save(csvPath);
	}

	async getPath() {
		const csvPath = await this.csvPathRepo.findOneBy({ id: 1 });
		return csvPath.path;
	}
}
