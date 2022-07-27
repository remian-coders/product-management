import { parse } from 'csv-parse';
import { open } from 'node:fs/promises';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { FixedProductsRepository } from '../repository/fixed-products.repository';

export const job = () => {
	return async () => {
		const fixedProductsRepo = new FixedProductsRepository();
		const dir = await new CsvPathRepository().getPath();
		const now = new Date();
		const date = ('0' + now.getDate()).slice(-2);
		const month = ('0' + (now.getMonth() + 1)).slice(-2);
		const year = now.getFullYear();
		const filePath = dir + `/realizari_${date}_${month}_${year}.csv`;
		const fd = await open(filePath, 'r');
		if (!fd) {
			//send email to admin about missing file
			return;
		}
		const stream = fd
			.createReadStream()
			.pipe(parse({ delimiter: ',', columns: true }));
		//1. save the scv into the database
		stream.on('data', async (fixedProduct) => {
			try {
				// const row = await fixedProductsRepo.create({
				// 	ticketNo: fixedProduct.ticketNo,
				// 	cost: Number(fixedProduct.cost) ? NaN : null,
				// 	technician: fixedProduct.technician,
				// });
			} catch (err) {
				// console.log(err);
			}
		});

		//2.compare today's clients' receipts with fixed products
		//3.compare today's admins' receipts with fixed products
		//4. if the fixed products are in the receipts, then delete the fixed products from the database
		//5. if the fixed products are not in the receipts more than 7 days, then notify the admins
	};
};
