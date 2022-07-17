import { Router } from 'express';
import { updatePath } from '../controllers/csv-path.controllers';

const router = Router();

router.patch('/', updatePath);

export default router;
