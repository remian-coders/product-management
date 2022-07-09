import { config } from 'dotenv';
import { App } from './app';
import { dataSource } from './data-source';
import { FixedProducts } from './entities/fixed-products';
import { SvcPath } from './entities/svc-path';
config({ path: './config.env' });

const { app } = new App();

dataSource
	.initialize({
		type: 'sqlite',
		database: './db.sqlite',
		entity: [FixedProducts, SvcPath],
		synchronize: true,
	})
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.error('Error connecting to database', err);
	});
