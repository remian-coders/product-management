import express, { Express } from 'express';
import csvPathRouter from './routes/csv-path.routes';
import clientRegisterRouter from './routes/client-register.routes';
import errorHandler from './controllers/error.controller';
import CustomErrorGenerator from './utils/custom-error-generator';
export class App {
	app: Express;
	constructor() {
		this.app = express();
		this.middleware();
		this.routes();
	}
	middleware() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}
	routes() {
		this.app.use('/api/csv-path', csvPathRouter);
		this.app.use('/api/client-register', clientRegisterRouter);
		this.app.use('*', (req, res, next) => {
			next(new CustomErrorGenerator('there is no such route', 404));
		});
	}
	errorHandler() {
		this.app.use(errorHandler);
	}
}
