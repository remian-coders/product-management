import express, { Request, Response, Router } from 'express';
import { CsvPathController } from '../controllers/csv-path.controllers';
const router = Router();

router.patch(
	'/',
	async (req: Request, res: Response, next: express.NextFunction) => {
		const response = await new CsvPathController().updatePath(
			req.body.path
		);
		res.status(201).json(response);
	}
);

export default router;
