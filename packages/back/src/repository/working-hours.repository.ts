import { Repository, Between } from 'typeorm';
import { WorkingHours } from '../entities/working-hours.entity';
import dataSource from '../data-source';
import { date } from '../utils/date';
import { cronManager } from '../cron-job/cron-job';
export class WorkingHoursRepository {
	workingHoursRepository: Repository<WorkingHours>;
	constructor() {
		this.workingHoursRepository = dataSource.getRepository(WorkingHours);
	}
	async getWorkingHours() {
		const workingHours = {
			today:
				(await this.workingHoursRepository.findOne({
					where: { type: 'today', date: date().today },
				})) || null,
			daily:
				(await this.workingHoursRepository.findOne({
					where: { type: 'daily' },
				})) || null,
		};

		return workingHours;
	}
	async getTodaysWorkingHours() {
		let workingHours = await this.workingHoursRepository.findOne({
			where: { type: 'today', date: date().today },
		});
		if (!workingHours) {
			workingHours = await this.workingHoursRepository.findOne({
				where: { type: 'daily' },
			});
		}
		return workingHours;
	}
	async updateWorkingHours(workingHours: WorkingHours) {
		let originalWorkingHours;
		if (workingHours.type === 'today') {
			originalWorkingHours = await this.workingHoursRepository.findOne({
				where: { type: 'today' },
			});
		} else if (workingHours.type === 'daily') {
			originalWorkingHours = await this.workingHoursRepository.findOne({
				where: { type: 'daily' },
			});
		}
		if (originalWorkingHours) {
			workingHours = Object.assign(originalWorkingHours, workingHours);
		}
		const updatedSchedule = await this.workingHoursRepository.save(
			workingHours
		);
		if (updatedSchedule.type === 'today') await cronManager.todaysCronJob();
		if (updatedSchedule.type === 'daily') await cronManager.dailyCronJob();
		await cronManager.logRunningJobs();
		return updatedSchedule;
	}
}
