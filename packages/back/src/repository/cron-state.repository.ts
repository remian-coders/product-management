import { Repository } from 'typeorm';
import dataSource from '../data-source';
import { CronState } from '../entities/cron-state.entity';

export class CronStateRepository {
	private repository: Repository<CronState>;
	constructor() {
		this.repository = dataSource.getRepository(CronState);
	}
	async getCronState() {
		const [cronState] = await this.repository.find();
		return cronState;
	}
	async setCronState(state: string) {
		let cronState = await this.getCronState();
		if (cronState) {
			cronState.state = state;
		} else {
			cronState = { state };
		}

		return await this.repository.save(cronState);
	}
}
