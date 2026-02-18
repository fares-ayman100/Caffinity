const nodemailer = require('nodemailer');
const pug = require('pug');
const { Resend } = require('resend');
const htmlToText = require('html-to-text');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = ` Caffinity <${process.env.EMAIL_FROM}>`;
  }

  // Transporter (dev only)
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.Mail_Trap_Host,
      port: process.env.Mail_Trap_Port,
      auth: {
        user: process.env.Mail_Trap_Username,
        pass: process.env.Mail_Trap_Password,
      },
    });
  }

  async send(template, subject) {
    // 1) Render Html
    const html = pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // 2) If production → use Resend API
    if (process.env.NODE_ENV === 'production') {
      return await resend.emails.send({
        from: this.from,
        to: this.to,
        subject,
        html,
      });
    }
    
    // 3) If dev → use Nodemailer
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Caffinity Family!');
  }

  async sendResetPassword() {
    await this.send('resetPassword', 'Reset your password');
  }
};