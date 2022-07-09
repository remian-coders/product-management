import express, { Express, Request, Response } from 'express';

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
		console.log('routes');
	}
	errorHandler() {
		console.log('errorHandler');
	}
}
