import { config } from 'dotenv';
import { App } from './app';
import dataSource from './data-source';
import { cronManager } from './cron-job/cron-job';
import { date } from './utils/date';
import path from 'path';
config({ path: path.join(__dirname, '../config.env') });
console.log(process.env.TZ);
// process.env.TZ = 'Asia/Seoul';
const { app } = new App();
dataSource
	.initialize()
	.then(async () => {
		await dataSource.addDefaultUser();
		app.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' }, () => {
			cronManager.todaysCronJob();
			cronManager.dailyCronJob();
			console.log(
				`Server running on port ${process.env.PORT}\nEnvironment ${process.env.NODE_ENV}`
			);
		});
	})
	.catch((err) => {
		console.error('Error connecting to database', err);
	});
