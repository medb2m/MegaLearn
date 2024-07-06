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

export async function sendEmail({ to, subject, htmlContent, from = config.emailFrom, imagePath, attachmentPaths = [] }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);

    // Load the HTML template
    const templatePath = path.join(__dirname, '..' ,'assets', 'mail', 'email-template.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual content
    htmlTemplate = htmlTemplate.replace('{{subject}}', subject);
    htmlTemplate = htmlTemplate.replace('{{content}}', htmlContent);

    // Prepare the attachments array if imagePath is provided
    const attachments = attachmentPaths.map((filePath, index) => ({
        filename: path.basename(filePath),
        path: filePath,
        cid : `image${index}@cid`
    }));
    if (imagePath) {
        attachments.push({
            filename: path.basename(imagePath),
            path: imagePath,
            cid: 'unique@cid'
        });
    }

    await transporter.sendMail({ from,
        to, 
        subject, 
        html: htmlTemplate,
        attachments 
    });
}

export default sendEmail;
