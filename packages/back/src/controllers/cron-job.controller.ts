import { parse } from 'csv-parse';
import { open } from 'node:fs/promises';
import { CronJob } from 'cron';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { FixedProductsRepository } from '../repository/fixed-products.repository';
import { v4 as uuid4 } from 'uuid';

export const cronJob = new CronJob('30 18 * * *', async () => {
	const csvPath = await new CsvPathRepository().getPath();
	const fixedProductsRepo = new FixedProductsRepository();
	const fd = await open(csvPath, 'r');
	if (!fd) {
		console.log('Error opening file');
		//handle the error
	}
	const stream = fd
		.createReadStream()
		.pipe(parse({ delimiter: ',', columns: true }));
	//1. save the scv into the database
	stream.on('data', async (fixedProduct) => {
		try {
			const row = await fixedProductsRepo.create({
				id: uuid4(),
				ticketNo: fixedProduct.ticketNo,
				cost: Number(fixedProduct.cost) ? NaN : null,
				technician: fixedProduct.technician,
			});
		} catch (err) {
			// console.log(err);
		}
	});

	//2.compare today's clients' receipts with fixed products
	//3.compare today's admins' receipts with fixed products
	//4. if the fixed products are in the receipts, then delete the fixed products from the database
	//5. if the fixed products are not in the receipts more than 7 days, then notify the admins
});
