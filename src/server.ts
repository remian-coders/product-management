import { config } from 'dotenv';
import { App } from './app';
import dataSource from './data-source';

config({ path: './config.env' });

const { app } = new App();

dataSource
	.initialize()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.error('Error connecting to database', err);
	});
