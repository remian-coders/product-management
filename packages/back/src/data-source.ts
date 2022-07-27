import { DataSource } from 'typeorm';
import bcryptjs from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { User } from './entities/users.entity';
class AppDataSource {
	_dataSource;
	constructor() {
		this._dataSource = new DataSource({
			type: 'sqlite',
			database: './db.sqlite',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		});
	}
	async addDefaultUser() {
		try {
			const usersRepo = this.getRepository(User);
			const users = await usersRepo.find();
			const user: User = {
				id: uuid4(),
				name: 'admin',
				email: 'admin@gmail.com',
				password: await bcryptjs.hash('pwd12345', 8),
			};
			if (users.length === 0) {
				await usersRepo.save(user);
			}
		} catch (err) {
			console.error(err);
		}
	}

	initialize(): Promise<void> {
		return this._dataSource.initialize();
	}
	getRepository(entityClass) {
		return this._dataSource.getRepository(entityClass);
	}
}
export default new AppDataSource();
