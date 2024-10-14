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
  async sendTeamMembershipRequestMail(to: string, teamMemberId: string) {
    try {
      await this.transport.sendMail({
        from: 'no-reply/keine Antwort <maul-server>',
        to,
        subject: 'Team membership request / Teammitgliedschaftsanfrage',
        html: `Activation request received from the candidate with team member id: ${teamMemberId} /
         Aktivierungsanfrage vom Kandidaten mit der Teammitglieds-ID erhalten: ${teamMemberId}`,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
  async sendTeamMembershipApprovedMail(to: string, teamMemberName: string) {
    try {
      await this.transport.sendMail({
        from: 'no-reply/keine Antwort <maul-server>',
        to,
        subject: 'Team membership approved / Teammitgliedschaft genehmigt',
        html: `Hello, ${teamMemberName}!\n
We are pleased to inform you that your application has been approved!
Welcome to our team!
\n\n
Hallo, ${teamMemberName}!\n
Wir freuen uns, Ihnen mitteilen zu können, dass Ihre Bewerbung genehmigt wurde!
Willkommen in unserem Team!`,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
}

export default new MailService();
