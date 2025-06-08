import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, // true для порта 465 (SSL)
    auth: {
        user: process.env.EMAIL_USER, // ваш email на Mail.ru
        pass: process.env.EMAIL_PASS, // пароль приложения или обычный пароль
    },
});
const sendWelcomeEmail = async (to, username) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Добро пожаловать!',
        html: `<h1>Привет, ${username}!</h1><p>Спасибо за регистрацию в нашем приложении!</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Письмо успешно отправлено');
    } catch (error) {
        console.log('Ошибка при отправке письма:', error);
    }
};

export default sendWelcomeEmail;