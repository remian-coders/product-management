import { Repository } from 'typeorm';
import { WorkingHours } from '../entities/working-hours.entity';
import dataSource from '../data-source';

export class WorkingHoursRepository {
	workingHoursRepository: Repository<WorkingHours>;
	constructor() {
		this.workingHoursRepository = dataSource.getRepository(WorkingHours);
	}
	async getWorkingHours() {
		const [workingHours] = await this.workingHoursRepository.find();
		return workingHours;
	}
	async updateWorkingHours(workingHours: WorkingHours) {
		const [originalWorkingHours] = await this.workingHoursRepository.find();
		if (originalWorkingHours) {
			workingHours = Object.assign(originalWorkingHours, workingHours);
		}
		return await this.workingHoursRepository.save(workingHours);
	}
}
