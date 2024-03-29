import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import errorHandler from './controllers/error.controller';
import { CustomError } from './utils/custom-error';
import clientRegisterRouter from './routes/client-register.routes';
import adminRouter from './routes/admin.routes';
import accessoryRouter from './routes/accessory.routes';
export class App {
	app: Express;
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
		this.errorHandler();
		this.settings();
	}
	settings() {}
	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}
	routes() {
		this.app.use('/api/client', clientRegisterRouter);
		this.app.use('/api/admin', adminRouter);
		this.app.use('/api/accessory', accessoryRouter);
		if (process.env.NODE_ENV === 'production') {
			this.app.use(
				express.static(path.resolve(__dirname, '../../front/build'))
			);
			this.app.get('*', function (req, res) {
				res.sendFile(
					path.join(__dirname, '../../front/build', 'index.html')
				);
			});
		}

		this.app.use('*', (req, res, next) => {
			next(new CustomError('there is no such route', 404));
		});
	}
	errorHandler() {
		this.app.use(errorHandler);
	}
}
