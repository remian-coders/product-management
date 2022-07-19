import { config } from 'dotenv';
import { App } from './app';
import dataSource from './data-source';
import { cronJob } from './controllers/cron-job.controller';

config({ path: './config.env' });

const { app } = new App();

dataSource
	.initialize()
	.then(() => {
		app.listen(process.env.PORT || 5000, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
		cronJob.start();
	})
	.catch((err) => {
		console.error('Error connecting to database', err);
	});
