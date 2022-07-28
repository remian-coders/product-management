import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { open } from 'node:fs/promises';

export class Mail {
	private from: string;
	private oAuth2: OAuth2Client;
	constructor() {
		this.from = process.env.EMAIL_ADDRESS;
		this.oAuth2 = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.GOOGLE_REDIRECT_URI
		);
	}
	async send(
		to: string[],
		subject: string,
		message: string,
		attachments?: any
	) {
		this.oAuth2.setCredentials({
			refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
		});
		const accessToken: any = await this.oAuth2.getAccessToken();
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
		});
		const mailOptions = {
			from: this.from,
			to,
			subject,
			secure: false,
			text: message,
			// html:
			attachments: attachments ? attachments : undefined,
		};
		return await transporter.sendMail(mailOptions);
	}
	async notify(to: string[], filePath: string) {
		const subject =
			'List of customers who have not picked up their devices for more than 7 days';
		const message = `<p></p>`;
		const fd = await open(filePath, 'r');
		const attachments = [
			{
				filename: 'text4.txt',
				content: fd.createReadStream(),
			},
		];
		return this.send(to, subject, message, attachments);
	}
	resetPassword(to: string, pwdResetUrl: string) {
		const subject = 'Reset your password!';
		const message = `<p>Click here <a href="${pwdResetUrl}">Reset Password</a> to reset your password.</p>\n<p>The link will expire after 10 minutes.</p>\n<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;
		return this.send([to], subject, message);
	}
}
