import { parse } from 'csv-parse';
import { open } from 'node:fs/promises';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { FixedProductsRepository } from '../repository/fixed-products.repository';
import { EmailRepository } from '../repository/email.repository';
import { Mail } from '../utils/mail';
import { RegisterRepository } from '../repository/register.repository';

export const job = async () => {
	try {
		const fixedProductsRepo = new FixedProductsRepository();
		const { path } = await new CsvPathRepository().getPath();
		if (!path) throw new Error('PathNotFound');
		const now = new Date();
		const date = ('0' + now.getDate()).slice(-2);
		const month = ('0' + (now.getMonth() + 1)).slice(-2);
		const year = now.getFullYear();
		const filePath = path + `/realizari_${date}_${month}_${year}.csv`;
		let fd = await open(filePath, 'r');
		if (!fd) throw new Error('CannotOpen');
		const stream = fd
			.createReadStream()
			.pipe(parse({ delimiter: ',', columns: true }));
		stream.on('data', async (fixedProduct) => {
			if (!Number(fixedProduct.Cost)) fixedProduct.Cost = null;
			const row = await fixedProductsRepo.create({
				ticketNo: fixedProduct.TicketNo,
				cost: Number(fixedProduct.Cost),
				technician: fixedProduct.Technician,
				date: new Date(),
			});
		});
		//2.compare today's clients' receipts with fixed products
		const fixedProducts = await fixedProductsRepo.getAll();
		console.log('fixedProducts***', fixedProducts);
		if (fixedProducts.length === 0) return;
		for (const fixedProduct of fixedProducts) {
			const registerRepo = new RegisterRepository();
			const register = await registerRepo.findByIdTicketNo(
				fixedProduct.ticketNo
			);
			if (!register) {
				// if the the product is not older than 7 days
				continue;
			}
			//check if the cost is equal to the fixed product's cost
			await fixedProductsRepo.delete(fixedProduct.id);
		}
	} catch (err) {
		const mail = new Mail();
		const emailRepo = new EmailRepository();
		const emailAddresses = await emailRepo.getEmailAddresses();
		let message = '';
		let subject = '';
		if (emailAddresses.length === 0) return;
		if (err.code === 'ENOENT' || err.message === 'CannotOpen') {
			subject = "Cannot read today's csv file";
			message =
				"The system cannot read today's csv file. Please set the correct CSV folder path and  upload the the file through the admin panel.";
		}
		if (err.message === 'PathNotFound') {
			subject = 'CSV folder path not set';
			message =
				'The system cannot find the path to the CSV folder. Please set the correct CSV folder path and  upload the the file through the admin panel.';
		}
		await mail.send(emailAddresses, subject, message);
	}
};
