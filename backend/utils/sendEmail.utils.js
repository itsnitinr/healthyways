const transporter = require('../config/smtp.config');

const sendEmail = async (options) => {
  await transporter.sendMail({
    from: 'HealthyWays Meals',
    to: options.toEmail,
    subject: options.subject,
    text: options.text,
  });
};

module.exports = sendEmail;
