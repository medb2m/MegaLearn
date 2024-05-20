import nodemailer from 'nodemailer'
import { config } from './config.js';


export async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
}

export default sendEmail