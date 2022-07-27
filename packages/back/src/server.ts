import { config } from 'dotenv';
import { App } from './app';
import dataSource from './data-source';
import { cronJob } from './cron-job/cron-job';

config({ path: './config.env' });

const { app } = new App();

dataSource
	.initialize()
	.then(async () => {
		await dataSource.addDefaultUser();
		app.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' }, () => {
			cronJob.start();
			console.log(`Server running on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.error('Error connecting to database', err);
	});
