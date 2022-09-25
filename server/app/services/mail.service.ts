import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { ACTIVATION_MAIL_SUBJECT } from "./constants";
import { EMPTY_STRING } from "../common/constants";

class MailService {
  SMTP_USER = process.env.SMTP_USER;
  SMTP_PASSWORD = process.env.SMTP_PASSWORD;
  SMTP_HOST = process.env.SMTP_HOST;
  SMTP_PORT = Number(process.env.SMTP_PORT || 0);

  TRANSPORTER_OPTIONS: SMTPTransport.Options = {
    host: this.SMTP_HOST || EMPTY_STRING,
    port: this.SMTP_PORT,
    secure: true,
    auth: {
      user: this.SMTP_USER || EMPTY_STRING,
      pass: this.SMTP_PASSWORD || EMPTY_STRING,
    },
  };

  transporter: Transporter<SMTPTransport.Options>;

  constructor() {
    this.transporter = nodemailer.createTransport(this.TRANSPORTER_OPTIONS);
  }

  async sendActivationMail(to: string, link: string): Promise<void> {
    const linkParts = link.split("/");
    const linkLabel = linkParts[linkParts.length - 1];

    await this.transporter.sendMail({
      from: this.SMTP_USER,
      to,
      subject: ACTIVATION_MAIL_SUBJECT,
      html: `
        <div>
          <h1>Активация учетной записи ${to}</h1>
          <h2 style="margin-top: 5px;">Для активации аккаунта перейдите по ссылке:</h2>
          <a href="${link}">${linkLabel}</a>
        </div>
      `,
    });
  }
}

export const mailService = new MailService();
