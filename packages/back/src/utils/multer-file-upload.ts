import multer from 'multer';
import { CustomError } from './custom-error';

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'text/csv') {
		cb(null, true);
	} else {
		cb(new CustomError('Please upload only csv file', 400), false);
	}
};
const storage = multer.memoryStorage();

export const multipartFileUpload = multer({
	limits: { fileSize: 1048576 * 100 },
	fileFilter,
	storage,
});
