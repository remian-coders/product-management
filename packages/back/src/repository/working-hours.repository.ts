import { Repository, Between } from 'typeorm';
import { WorkingHours } from '../entities/working-hours.entity';
import dataSource from '../data-source';
import { date } from '../utils/date';
export class WorkingHoursRepository {
	workingHoursRepository: Repository<WorkingHours>;
	constructor() {
		this.workingHoursRepository = dataSource.getRepository(WorkingHours);
	}
	async getWorkingHours() {
		const workingHours = [];
		const todayWorkingHours = await this.workingHoursRepository.find();
		for (const el of todayWorkingHours) {
			if (el.type === 'today' && `${el.date}` !== `${date().today}`)
				continue;

			workingHours.push(el);
		}
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
		return await this.workingHoursRepository.save(workingHours);
	}
}
