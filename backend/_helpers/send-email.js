/* import nodemailer from 'nodemailer'
import { config } from './config.js';


export async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
}

export default sendEmail */

import nodemailer from 'nodemailer';
import { config } from './config.js';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';

import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function sendEmail({ to, subject, htmlContent, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);

    // Load the HTML template
    const templatePath = path.join(__dirname, 'email-template.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual content
    htmlTemplate = htmlTemplate.replace('{{subject}}', subject);
    htmlTemplate = htmlTemplate.replace('{{content}}', htmlContent);

    await transporter.sendMail({ from, to, subject, html: htmlTemplate });
}

export default sendEmail;
