import multer from 'multer';
import { CustomError } from './custom-error';

const fileFilter = (req, file, cb) => {};
const storage = multer.memoryStorage();

export const multerFileUpload = multer({
	limits: { fileSize: 1048576 },
	fileFilter,
	storage,
});
