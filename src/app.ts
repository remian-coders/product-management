import express, { Express } from 'express';
import csvPathRouter from './routes/csv-path.routes';
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
	}
	errorHandler() {
		console.log('errorHandler');
	}
}
