import { CsvPathRepository } from '../repository/csv-path.repository';

export class CsvPathController {
	public csvPathRepo: CsvPathRepository;
	constructor() {
		this.csvPathRepo = new CsvPathRepository();
	}
	async updatePath(path: string) {
		try {
			const updatedPath = await this.csvPathRepo.updatePath(path);
			return updatedPath;
		} catch (err) {
			console.error(err);
		}
	}
}
