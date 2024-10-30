import nodemailer from 'nodemailer';
import { ApiError } from '../exceptions/api-error';
import { CLIENT_ORIGIN } from '../constants';

class MailService {
  transport;
  from = 'no-reply <meiga>';
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
        from: this.from,
        to,
        subject: 'Account activation / Accountaktivierung',
        html: `
<h3>Dear User!</h3>
<p>Please, follow this <a href="${CLIENT_ORIGIN}/email-confirmation/${identifier}">link</a> to verify your email address</p>
<br/>
<h3>Sehr geehrter Benutzer!</h3>
<p>Bitte folgen Sie diesem <a href="${CLIENT_ORIGIN}/email-confirmation/${identifier}">Link</a>, um Ihre E-Mail-Adresse zu bestätigen</p>
`,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
  async sendTeamMembershipRequestMail(to: string, teamMemberId: string) {
    try {
      await this.transport.sendMail({
        from: this.from,
        to,
        subject: 'Team membership request / Teammitgliedschaftsanfrage',
        html: `
<h3>Dear Website Administrator!</h3>
<p>Activation request received from the candidate with team member ID: ${teamMemberId}</p>
<br/>
<h3>Sehr geehrter Website-Administrator!</h3>
<p>Aktivierungsanfrage vom Kandidaten mit der Teammitglieds-ID erhalten: ${teamMemberId}</p>
`,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
  async sendTeamMembershipApprovedMail(to: string, teamMemberName: string) {
    try {
      await this.transport.sendMail({
        from: this.from,
        to,
        subject: 'Team membership approved / Teammitgliedschaft genehmigt',
        html: `
<h3>Hello, ${teamMemberName}!</h3>
<p>We are pleased to inform you that your application has been approved!</p>
<p>Welcome to our team!</p>
<b>Best regards</b>
<br/>
<h3>Hallo, ${teamMemberName}!</h3>
<p>Wir freuen uns, Ihnen mitteilen zu können, dass Ihre Bewerbung genehmigt wurde!</p>
<p>Willkommen in unserem Team!</p>
<b>Mit freundlichen Grüßen</b>
`,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
  async sendTeamMembershipTerminatedMail(to: string, teamMemberName: string) {
    try {
      await this.transport.sendMail({
        from: this.from,
        to,
        subject: 'Team membership terminated / Teammitgliedschaft beendet',
        html: `
<h3>Hello, ${teamMemberName}!</h3>
<p>We inform you that your membership in the team has been terminated.</p>
<p>All the best</p>
<br/>
<h3>Hallo, ${teamMemberName}!</h3>
<p>Wir informieren Sie, dass Ihre Mitgliedschaft im Team beendet wurde.</p>
<p>Alles Gute</p>
`,
      });
    } catch (error) {
      throw ApiError.ServerError('Mail Service Error');
    }
  }
}

export default new MailService();
