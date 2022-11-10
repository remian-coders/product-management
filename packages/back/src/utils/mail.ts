import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { open } from 'node:fs/promises';
import { date } from './date';

// export class Mail {
// 	private from: string;
// 	private oAuth2: OAuth2Client;
// 	constructor() {
// 		this.from = process.env.EMAIL_ADDRESS;
// 		this.oAuth2 = new google.auth.OAuth2(
// 			process.env.GOOGLE_CLIENT_ID,
// 			process.env.GOOGLE_CLIENT_SECRET,
// 			process.env.GOOGLE_REDIRECT_URI
// 		);
// 	}
// 	async send(to: string[], subject: string, html: string, attachments?: any) {
// 		this.oAuth2.setCredentials({
// 			refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// 		});
// 		const accessToken: any = await this.oAuth2.getAccessToken();
// 		const transporter = nodemailer.createTransport({
// 			service: 'gmail',
// 			auth: {
// 				type: 'OAuth2',
// 				user: process.env.EMAIL_ADDRESS,
// 				clientId: process.env.GOOGLE_CLIENT_ID,
// 				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 				refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
// 				accessToken: accessToken,
// 			},
// 			port: 465,
// 			host: 'smtp.gmail.com',
// 		});
// 		let mailOptions = {
// 			from: this.from,
// 			to,
// 			subject,
// 			secure: false,
// 			html,
// 			attachments: attachments ? attachments : undefined,
// 		};
// 		return await transporter.sendMail(mailOptions);
// 	}
// 	async resetPassword(to: string, pwdResetUrl: string) {
// 		const subject = 'Reset your password!';
// 		const message = `<p>Click here <a href="${pwdResetUrl}">Reset Password</a> to reset your password.</p>\n<p>The link will expire after 10 minutes.</p>\n<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;
// 		return await this.send([to], subject, message);
// 	}
// }

export const mail = async (
	to: string[],
	subject: string,
	html: string,
	attachments?: any
) => {
	const from = process.env.EMAIL_ADDRESS;
	const oAuth2 = new google.auth.OAuth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		process.env.GOOGLE_REDIRECT_URI
	);
	oAuth2.setCredentials({
		refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
	});
	const accessToken: any = await oAuth2.getAccessToken();
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.EMAIL_ADDRESS,
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
			accessToken: accessToken,
		},
		port: 465,
		host: 'smtp.gmail.com',
		pool: true,
	});
	let mailOptions = {
		from,
		to,
		subject,
		secure: false,
		html,
		attachments: attachments ? attachments : undefined,
	};
	await transporter.sendMail(mailOptions);
	return null;
};
