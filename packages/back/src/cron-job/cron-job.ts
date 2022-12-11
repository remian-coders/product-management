import { CronJob } from 'cron';
import { WorkingHoursRepository } from '../repository/working-hours.repository';
import { CronStateRepository } from '../repository/cron-state.repository';
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
		delete this.jobs[name];
	}
	async stopAll() {
		for (const job in this.jobs) {
			this.stop(job);
		}
	}
	async start() {
		await this.setState();
		await this.todaysCronJob();
		await this.dailyCronJob();
	}
	async setState() {
		const cronStateRepository = new CronStateRepository();
		const cronState = await cronStateRepository.getCronState();
		if (cronState) return;
		await cronStateRepository.setCronState('on');
	}
	async todaysCronJob() {
		const workingHoursRepo = new WorkingHoursRepository();
		const { today } = await workingHoursRepo.getWorkingHours();
		if (!today || `${today.date}` !== `${date().today}`) return;
		const closingTime = new Date(today.to);
		const closingHour = closingTime.getHours();
		const closingMinute = closingTime.getMinutes() + 1;
		this.add(
			'todaysCronJob',
			`${closingMinute} ${closingHour} * * 1-5`,
			async () => {
				await job();
				this.stop('todaysCronJob');
			}
		);
	}
	async dailyCronJob() {
		if (this.jobs['dailyCronJob']) this.stop('dailyCronJob');
		const workingHoursRepo = new WorkingHoursRepository();
		const { daily } = await workingHoursRepo.getWorkingHours();
		if (!daily) return;
		const closingTime = new Date(daily.to);
		const closingHour = closingTime.getHours();
		const closingMinute = closingTime.getMinutes() + 1;
		this.add(
			'dailyCronJob',
			`${closingMinute} ${closingHour} * * 1-5`,
			async () => {
				const workingHours =
					await workingHoursRepo.getTodaysWorkingHours();
				if (workingHours.type !== 'daily') return;
				await job();
			}
		);
	}

	async logRunningJobs() {
		// console.log(
		// 	'**** Daily Job *****',
		// 	this.jobs['dailyCronJob'].cron.nextDates()
		// );
		// console.log(
		// 	'**** Today`s Job *****',
		// 	this.jobs['todaysCronJob'].cron.nextDates()
		// );
	}
}

export const cronManager = new CronManager();
