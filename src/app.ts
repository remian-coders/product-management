import express, { Express } from 'express';
import errorHandler from './controllers/error.controller';
import { CustomError } from './utils/custom-error';
import csvPathRouter from './routes/csv-path.routes';
import clientRegisterRouter from './routes/client-register.routes';
import adminRouter from './routes/admin.routes';
export class App {
	app: Express;
	constructor() {
		this.app = express();
		this.middleware();
		this.routes();
		this.errorHandler();
	}
	middleware() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}
	routes() {
		this.app.use('/api/csv-path', csvPathRouter);
		this.app.use('/api/client-register', clientRegisterRouter);
		this.app.use('/api/admin', adminRouter);
		this.app.use('*', (req, res, next) => {
			next(new CustomError('there is no such route', 404));
		});
	}
	errorHandler() {
		this.app.use(errorHandler);
	}
}
