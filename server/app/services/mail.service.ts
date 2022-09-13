import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporterOptions: SMTPTransport.Options = {
  host: process.env.SMTP_HOST || "",
  port: Number(process.env.SMTP_PORT || 0),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASSWORD || "",
  },
};
1;

class MailService {
  transporter: Transporter<SMTPTransport.Options>;

  constructor() {
    this.transporter = nodemailer.createTransport(transporterOptions);
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта в системе "Онлайн Библиотека"',
      html: `
        <div>
          <h1>Активация учетной записи ${to}</h1>
          <h2 style="margin-top: 5px;">Для активации аккаунта перейдите по ссылке:</h2>
          <a href={${link}}>${link}</a>
        </div>
      `,
    });
  }
}

export const mailService = new MailService();
