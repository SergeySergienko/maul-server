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
  async sendAccountActivationMail(to: string, identifier: string) {
    try {
      await this.transport.sendMail({
        from: 'no-reply/keine Antwort <maul-server>',
        to,
        subject: 'Account activation / Accountaktivierung',
        html: `Follow this <a href="${CLIENT_ORIGIN}/email-confirmation/${identifier}">link</a> to verify your email address /
         Folgen Sie diesem <a href="${CLIENT_ORIGIN}/email-confirmation/${identifier}">Link</a>, um Ihre E-Mail-Adresse zu bestätigen`,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
  async sendTeamMemberActivationMail(to: string, teamMemberId: string) {
    try {
      await this.transport.sendMail({
        from: 'no-reply/keine Antwort <maul-server>',
        to,
        subject:
          'Team membership activation / Aktivierung der Teammitgliedschaft',
        html: `Activation request received from the candidate with team member id: ${teamMemberId} /
         Aktivierungsanforderung vom Kandidaten mit der Teammitglieds-ID erhalten: ${teamMemberId}`,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
}

export default new MailService();
