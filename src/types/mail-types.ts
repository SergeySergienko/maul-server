import { RoleModel } from '../models';

export type Mail = {
  to: string;
  heading: MailHeading;
  identifier?: string;
  role?: Exclude<keyof typeof RoleModel, 'OWNER'>;
  teamMemberId?: string;
  teamMemberName?: string;
};

export type MailContent = {
  subject: string;
  html: string;
};

type MailHeading =
  | 'accountActivate'
  | 'roleChange'
  | 'membershipRequest'
  | 'membershipApprove'
  | 'membershipTerminate'
  | 'membershipSuspend';
