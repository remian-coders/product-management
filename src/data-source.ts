import { DataSource } from 'typeorm';

class AppDataSource {
	_dataSource;
	constructor() {
		this._dataSource = new DataSource({
			type: 'sqlite',
			database: './db.sqlite',
			entities: ['src/entities/*.ts'],
			synchronize: true,
		});
	}
	initialize(): Promise<void> {
		return this._dataSource.initialize();
	}
	getRepository(entityClass) {
		return this._dataSource.getRepository(entityClass);
	}
}
export default new AppDataSource();
