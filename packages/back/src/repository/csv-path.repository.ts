import dataSource from '../data-source';
import { CsvPath } from '../entities/csv-path.entity';
import { Repository } from 'typeorm';

export class CsvPathRepository {
	csvPathRepo: Repository<CsvPath>;
	constructor() {
		this.csvPathRepo = dataSource.getRepository(CsvPath);
	}
	async updatePath(path: string) {
		let [csvPath] = await this.csvPathRepo.find();
		if (csvPath) {
			csvPath.path = path;
		} else {
			csvPath = { path };
		}
		return await this.csvPathRepo.save(csvPath);
	}

	async getPath() {
		const [csvPath] = await this.csvPathRepo.find();
		return csvPath.path;
	}
}
