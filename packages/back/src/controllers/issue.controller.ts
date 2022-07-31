import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { CustomError } from '../utils/custom-error';
import { IssueRepository } from '../repository/issue.repository';
import { FixedProductsRepository } from '../repository/fixed-products.repository';
export const getIssues = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const issueRepository = new IssueRepository();
		const issues = await issueRepository.getIssues();
		res.status(200).json({
			status: 'success',
			message: 'Successfully fetched issues',
			data: { issues },
		});
	}
);

export const deleteIssue = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const issueRepo = new IssueRepository();
		const fixedProductsRepo = new FixedProductsRepository();
		const { id } = req.params;
		const issue = await issueRepo.getIssue(id);
		if (issue && issue.productId)
			await fixedProductsRepo.delete(issue.productId);
		await issueRepo.deleteIssue(id);
		res.status(200).json({
			status: 'success',
			message: 'Successfully deleted issue',
		});
	}
);
