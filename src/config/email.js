const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: process.env.BREVO_SMTP_PORT,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS
    }
});

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;