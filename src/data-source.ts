import { DataSource } from 'typeorm';

class AppDataSource {
	_dataSource: any = null;
	initialize(options): Promise<void> {
		this._dataSource = new DataSource(options);
		return this._dataSource.initialize();
	}
	getReository(entityClass) {
		return this._dataSource.getRepository(entityClass);
	}
}
export const dataSource = new AppDataSource();
