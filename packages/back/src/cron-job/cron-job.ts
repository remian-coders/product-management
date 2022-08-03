import { CronJob } from 'cron';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { date } from '../utils/date';
import { job } from './job';

class CronManager {
	private jobs: {};
	constructor() {
		this.jobs = {};
	}
	add(name, periodText, cb) {
		this.jobs[name] = {
			name,
			cron: new CronJob(periodText, cb),
		};
		this.jobs[name].cron.start();
	}
	stop(name) {
		this.jobs[name].cron.stop();
	}
	async todaysCronJob() {
		const workingHoursRepo = new WorkingHoursRepository();
		const { today } = await workingHoursRepo.getWorkingHours();
		if (!today || `${today.date}` !== `${date().today}`) return;
		const closingTime = new Date(today.to);
		const closingHour = closingTime.getHours();
		const closingMinute = closingTime.getMinutes() + 1;
		this.add(
			'todays-cron-job',
			`${closingMinute} ${closingHour} * * *`,
			async () => {
				await job();
				this.stop('todays-cron-job');
			}
		);
	}
	async dailyCronJob() {
		if (this.jobs['daily-cron-job']) this.stop('daily-cron-job');
		const workingHoursRepo = new WorkingHoursRepository();
		const { daily } = await workingHoursRepo.getWorkingHours();
		if (!daily) return;
		const closingTime = new Date(daily.to);
		const closingHour = closingTime.getHours();
		const closingMinute = closingTime.getMinutes() + 1;
		this.add(
			'daily-cron-job',
			`${closingMinute} ${closingHour} * * *`,
			async () => {
				const workingHours =
					await workingHoursRepo.getTodaysWorkingHours();
				if (workingHours.type !== 'daily') return;
				await job();
			}
		);
	}
}

export const cronManager = new CronManager();
