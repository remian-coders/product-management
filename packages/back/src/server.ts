import { config } from 'dotenv';
import { App } from './app';
import dataSource from './data-source';
import { cronJob } from './controllers/cron-job.controller';

config({ path: './config.env' });

const { app } = new App();

dataSource
	.initialize()
	.then(async () => {
		await dataSource.addDefaultUser();
		app.listen(process.env.PORT || 5000, () => {
			cronJob.start();
			console.log(`Server running on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.error('Error connecting to database', err);
	});
