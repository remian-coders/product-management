import { parse } from 'csv-parse';
import { open } from 'node:fs/promises';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { FixedProductsRepository } from '../repository/fixed-products.repository';
import { EmailRepository } from '../repository/email.repository';
import { Mail } from '../utils/mail';
import { RegisterRepository } from '../repository/register.repository';
import { IssueRepository } from '../repository/issue.repository';
export const job = async () => {
	try {
		const fixedProductsRepo = new FixedProductsRepository();
		const filePath = await new CsvPathRepository().getPath();
		if (!filePath) {
			handleIssue({ errorType: 'PathNotSet' });
			return;
		}

		const now = new Date();
		const date = ('0' + now.getDate()).slice(-2);
		const month = ('0' + (now.getMonth() + 1)).slice(-2);
		const year = now.getFullYear();
		const fullPath =
			filePath.path + `/realizari_${date}_${month}_${year}.csv`;
		let fd = await open(fullPath, 'r');
		const stream = fd
			.createReadStream()
			.pipe(parse({ delimiter: ',', columns: true }));
		stream.on('error', (err) => {
			handleIssue({ errorType: 'CannotParse' });
		});
		const promise = new Promise((resolve, reject) => {
			stream.on('data', async (fixedProduct) => {
				try {
					await fixedProductsRepo.create({
						ticketNo: fixedProduct.TicketNo,
						cost: Number(fixedProduct.Cost) || 0,
						technician: fixedProduct.Technician,
						date: new Date(),
						// date: new Date('2022-07-24'),
					});
					resolve('end');
				} catch (err) {
					handleIssue({
						product: fixedProduct,
						errorType: 'CannotCreate',
					});
				}
			});
		});
		await promise;
		const fixedProducts = await fixedProductsRepo.getAll();
		if (fixedProducts.length === 0) return;
		for (const fixedProduct of fixedProducts) {
			const registerRepo = new RegisterRepository();
			const register = await registerRepo.findByIdTicketNo(
				fixedProduct.ticketNo
			);
			if (!register) {
				if (
					new Date(fixedProduct.date).getTime() <=
					Date.now() - 7 * 24 * 60 * 60 * 1000
				) {
					handleIssue({
						product: fixedProduct,
						errorType: 'OlerThan7Days',
					});
				}
				continue;
			}
			const fivePercentLess =
				fixedProduct.cost - fixedProduct.cost * 0.05;
			if (
				register.cost < fivePercentLess &&
				register.registerType === 'income'
			) {
				handleIssue({
					product: fixedProduct,
					errorType: 'CostDifference',
				});
				continue;
			}
			await fixedProductsRepo.delete(fixedProduct.id);
		}
	} catch (err) {
		if (err.code === 'ENOENT') {
			handleIssue({
				errorType: 'FileNotFound',
			});
		}
	}
};
async function handleIssue(err) {
	console.log(err);
	let message = '';
	let subject = '';
	let type = '';
	if (err.errorType === 'PathNotSet') {
		subject = 'The path to the csv file is not set.';
		message =
			'The path to the csv file is not set. \n Please set the path in the admin page.';
		type = 'general';
	} else if (err.errorType === 'FileNotFound') {
		subject = `Today's CSV file is not found.`;
		message = `Today's CSV file is not found. \n Please set the correct path to the file and upload today's file from the admin page.`;
		type = 'general';
	} else if (err.errorType === 'CannotCreate') {
		subject = `Cannot save in database`;
		message = `Cannot save the following product in to database.\nSomething is wrong with this product record in CSV file.\nPlease please fix the error and  upload the file again. \nTicket No:  ${err.product.TicketNo} \nTechnician: ${err.product.Technician}`;
		type = 'general';
	} else if (err.errorType === 'CannotParse') {
		subject = `Cannot read a line in the csv file.`;
		message = `Cannot read a line in the csv file. \n Please check the CSV file and make sure it is in the correct format or all the values are provided.`;
		type = 'general';
	} else if (err.errorType === 'OlerThan7Days') {
		subject = `Product is older than 7 days`;
		message = `Product is older than 7 days. \nTicket No: ${err.product.ticketNo} \nTechnician: ${err.product.technician}\nCost: ${err.product.cost}.`;
		type = 'older-than-7-days';
	} else if (err.errorType === 'CostDifference') {
		subject = `Cost difference`;
		message = `Cost difference. \n Ticket No: ${err.product.ticketNo} \n Technician: ${err.product.technician}\n\nCost: ${err.product.cost}.`;
		type = 'cost-difference';
	}
	try {
		const mail = new Mail();
		const emailRepo = new EmailRepository();
		const emailAddresses = await emailRepo.getEmailAddresses();
		if (emailAddresses.length === 0) return;
		await mail.send(emailAddresses, subject, message);
		const issueRepo = new IssueRepository();
		let productId = null;
		if (err.product) {
			productId = err.product.id;
		}
		await issueRepo.save({
			type: type,
			description: message,
			productId,
		});
	} catch (err) {
		console.log(err);
	}
}
