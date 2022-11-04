import { mail } from './mail';
import { EmailRepository } from '../repository/email.repository';
import { IssueRepository } from '../repository/issue.repository';

export const sendNotification = async (err) => {
	let message = '';
	let subject = '';
	let type = '';
	if (err.errorType === 'PathNotSet') {
		subject = 'The path to the csv file is not set';
		message =
			'The path to the csv file is not set. \n Please set the path in the admin page.';
		type = 'general';
	} else if (err.errorType === 'FileNotFound') {
		subject = `Today's CSV file is not found.`;
		message = `Please set the correct path to the file and upload today's file from the admin page.`;
		type = 'general';
	} else if (err.errorType === 'CannotCreate') {
		subject = `Cannot save in database`;
		message = `Something is wrong with this product record in CSV file.\nPlease please fix the error and  upload the file again. \nTicket No:  ${err.product.TicketNo} \nTechnician: ${err.product.Technician} `;
		type = 'general';
	} else if (err.errorType === 'CannotParse') {
		subject = `Cannot read a line in the csv file.`;
		message = `Please check the CSV file and make sure it is in the correct format or all the values are provided. `;
		type = 'general';
	} else if (err.errorType === 'OlerThan7Days') {
		subject = ` Product is older than 7 days`;
		message = `Ticket No: ${err.product.ticketNo} \nTechnician: ${err.product.technician}\nCost: ${err.product.cost}.`;
		type = 'older-than-7-days';
	} else if (err.errorType === 'CostDifference') {
		subject = ` Cost difference `;
		message = `Ticket No: ${err.product.ticketNo}\nTechnician: ${
			err.product.technician
		}\nFixed Product Cost: ${err.product.cost}. \nRegistry Cost: ${
			err.register.cost
		}. \n(PHD/Casa): ${err.product.cost} - ${err.register.cost} = ${
			err.product.cost - err.register.cost
		}.`;
		type = 'cost-difference';
	} else if (err.errorType === 'IncompletePayment') {
		subject = 'Incomplete Payment';
		message = `Ticket No: ${err.product.ticketNo}\nFixed Date: ${err.product.date}\nRegistered Date: ${err.register.date}\nCost: ${err.product.cost}\nPaid: ${err.register.paid}\nUnpaid: ${err.register.unPaid}`;
		type = 'incomplete-payment';
	} else if (err.errorType === 'OutOfStock') {
		subject = 'Out of stock';
		message = `${err.product.name} is out of stock.\nCategory: ${err.product.category.name}\nBrand: ${err.product.brand}\nName: ${err.product.name}`;
		type = 'out-of-stock';
	}

	const date = new Date();
	const messagesLine = message.split('\n');
	const messageHtml = messagesLine
		.map((line) => {
			return `<p>${line}</p>`;
		})
		.join('\n');

	const html = `<html><body>${messageHtml} 
		<p>Date:
			${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(
		-2
	)}-${date.getFullYear()}, ${('0' + date.getHours()).slice(-2)}:${(
		'0' + date.getMinutes()
	).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}
		</p>
		</body>
		</html>`;
	try {
		const emailRepo = new EmailRepository();
		const emailAddresses = await emailRepo.getEmailAddresses();
		if (emailAddresses.length === 0) return;
		await mail(emailAddresses, subject, html);
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
};
