import nodemailer from 'nodemailer';
import { ApiError } from '../exceptions/api-error';
import { CLIENT_ORIGIN } from '../constants';

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
  async sendActivationMail(to: string, identifier: string) {
    try {
      await this.transport.sendMail({
        from: 'no-reply <maul-server>',
        to,
        subject: 'Account activation',
        html: `Follow this <a href="${CLIENT_ORIGIN}/email-confirmation/${identifier}">link</a> to verify your email address`,
      });
    } catch (error) {
      throw ApiError.ServerError('Internal Server Error');
    }
  }
}

export default new MailService();
