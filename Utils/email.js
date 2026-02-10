const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  // 1) create transport
  const transport = nodemailer.createTransport({
    host: process.env.Mail_Trap_Host,
    port: process.env.Mail_Trap_Port,
    auth: {
      user: process.env.Mail_Trap_Username,
      pass: process.env.Mail_Trap_Password,
    },
  });

  // 2) define the email options
  const mailTrapOption = {
    from: 'Fares Ayman <caffinity@gmail.com>',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  // 3) actually send the email
  await transport.sendMail(mailTrapOption);
};

module.exports = sendEmail;
