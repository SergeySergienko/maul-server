import nodemailer from 'nodemailer';
import { ApiError } from '../exceptions/api-error';
import { Mail } from '../types';
import { getMailContent } from '../utils';

class MailService {
  transport;
  constructor() {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async sendMail({ to, ...rest }: Mail) {
    const { subject, html } = getMailContent(rest);
    try {
      await this.transport.sendMail({
        from: 'no-reply <meiga>',
        to,
        subject,
        html,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
}

export default new MailService();
