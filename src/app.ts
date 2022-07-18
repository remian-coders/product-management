import path from 'path';
import express, { Express } from 'express';
import errorHandler from './controllers/error.controller';
import { CustomError } from './utils/custom-error';
import clientRegisterRouter from './routes/client-register.routes';
import adminRouter from './routes/admin.routes';
export class App {
	app: Express;
	constructor() {
		this.app = express();
		this.middlewares();
		this.settings();
		this.routes();
		this.errorHandler();
	}
	settings() {
		this.app.set('view engine', 'pug');
		this.app.set('views', path.join(__dirname, 'src/views'));
	}
	middlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static(path.join(__dirname, 'src/public')));
	}
	routes() {
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
