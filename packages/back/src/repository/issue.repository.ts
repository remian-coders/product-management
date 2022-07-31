import { Repository } from 'typeorm';
import { Issue } from '../entities/issue.entity';
import dataSource from '../data-source';

export class IssueRepository {
	issueRepository: Repository<Issue>;
	constructor() {
		this.issueRepository = dataSource.getRepository(Issue);
	}
	async save(issue: Issue) {
		if (issue.productId) {
			const existingIssue = await this.issueRepository.findOne({
				where: {
					productId: issue.productId,
					type: issue.type,
				},
			});
			issue = existingIssue || issue;
		}
		return await this.issueRepository.save(issue);
	}
	async getIssue(id) {
		return await this.issueRepository.findOne({ where: { id } });
	}
	async getIssues() {
		return await this.issueRepository.find({
			order: {
				date: 'DESC',
			},
		});
	}
	async deleteIssue(id) {
		return await this.issueRepository.delete(id);
	}
}
