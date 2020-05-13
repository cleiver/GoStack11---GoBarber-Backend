import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailprovider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject,
      text: content,
    });

    console.log('Email URL:', nodemailer.getTestMessageUrl(message));
  }
}
