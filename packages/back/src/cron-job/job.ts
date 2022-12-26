import { parse } from 'csv-parse';
import { open } from 'node:fs/promises';
import { CsvPathRepository } from '../repository/csv-path.repository';
import { FixedProductsRepository } from '../repository/fixed-products.repository';
import { RegisterRepository } from '../repository/register.repository';
import { sendNotification } from '../utils/notification';
import { CronStateRepository } from '../repository/cron-state.repository';

export const job = async () => {
	try {
		const fixedProductsRepo = new FixedProductsRepository();
		let cronStateRepository = new CronStateRepository();
		let cronState = await cronStateRepository.getCronState();
		if(cronState.state === 'on'){
			const filePath = await new CsvPathRepository().getPath();
			if (!filePath) {
				sendNotification({ errorType: 'PathNotSet' });
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
				sendNotification({ errorType: 'CannotParse' });
			});
			const promise = new Promise((resolve, reject) => {
				stream.on('data', async (fixedProduct) => {
					try {
						await fixedProductsRepo.create({
							ticketNo: fixedProduct.TicketNo,
							cost: Number(fixedProduct.Cost) || 0,
							technician: fixedProduct.Technician,
							date: new Date(),
						});
						resolve('end');
					} catch (err) {
						sendNotification({
							product: fixedProduct,
							errorType: 'CannotCreate',
						});
					}
				});
			});
			await promise;
		}
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
					sendNotification({
						product: fixedProduct,
						errorType: 'OlerThan7Days',
					});
				}
				continue;
			}
			const fivePercentLess =
				fixedProduct.cost - fixedProduct.cost * 0.05;
			const fivePercentBigger =
				fixedProduct.cost + fixedProduct.cost * 0.05;
			if (
				register.cost < fivePercentLess ||
				register.cost > fivePercentBigger
			) {
				sendNotification({
					product: fixedProduct,
					register,
					errorType: 'CostDifference',
				});
				continue;
			}
			if ((register.paymentStatus = 'incomplete')) {
				if (
					new Date(register.date).getTime() <=
					Date.now() - 7 * 24 * 60 * 60 * 1000
				) {
					sendNotification({
						product: fixedProduct,
						register,
						errorType: 'IncompletePayment',
					});
				}
				continue;
			}
			await fixedProductsRepo.delete(fixedProduct.id);
		}
	} catch (err) {
		if (err.code === 'ENOENT') {
			sendNotification({
				errorType: 'FileNotFound',
			});
		}
	}
};
