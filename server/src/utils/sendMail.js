import nodemailer from "nodemailer";
import { GMAIL_APP_EMAIL, GMAIL_APP_PASSWORD } from "../config/index.js";


export const sendMail = async ({ senderEmail, subject, text, res }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: GMAIL_APP_EMAIL,
                pass: GMAIL_APP_PASSWORD,
            }
        });

        const mailOptions = {
            from: GMAIL_APP_EMAIL,
            to: senderEmail,
            subject,
            text,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(500).json({ success: true, message: 'Failed to send email.' })
            } else {
                res.status(200).json({ success: true, message: 'Please check your email and reset your password' })
            }
        });
    } catch (error) {
        res.status(500).json({ success: true, message: 'Failed to send email.' })
    }
}
