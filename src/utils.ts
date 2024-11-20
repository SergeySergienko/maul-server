import { WithId } from 'mongodb';
import { Request } from 'express';
import path from 'path';
import sharp from 'sharp';
import {
  ALLOWED_EXTENSIONS,
  CLIENT_ORIGIN,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from './constants';
import {
  CustomJwtPayload,
  EventModel,
  TeamMemberModel,
  UserModel,
} from './models';
import { tokensService } from './services';
import {
  EventOutputDTO,
  Mail,
  MailContent,
  NormalizedImageResult,
  TeamMemberOutputDTO,
  UserOutputDTO,
} from './types';
import { ApiError } from './exceptions/api-error';

export const isDateValid = (date: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  return regex.test(date);
};

export const normalizeImage = async (
  file: Express.Multer.File
): Promise<NormalizedImageResult> => {
  const { name: originalFileName, ext: originalFileExtension } = path.parse(
    file.originalname
  );

  const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(
    originalFileExtension.toLowerCase()
  );
  const normalizedFileName = isExtensionAllowed
    ? `${originalFileName}.webp`
    : null;

  const resizedImageBuffer = await sharp(file.buffer)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
    .webp({ quality: 50, nearLossless: true })
    .toBuffer();

  return {
    normalizedFileName,
    resizedImageBuffer,
  };
};

export const parseBlobUrl = (url: string) => {
  const parsedUrl = new URL(url);

  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;

  // Get the path without leading slash and decode special characters
  const fullPath = decodeURIComponent(parsedUrl.pathname.substring(1));

  // Split the full path into container name and blob name
  const lastSlashIndex = fullPath.lastIndexOf('/');
  const containerName = fullPath.substring(0, lastSlashIndex);
  const blobName = fullPath.substring(lastSlashIndex + 1);

  return {
    baseUrl,
    containerName,
    blobName,
  };
};

export const userModelMapper = ({
  _id,
  email,
  role,
  createdAt,
  updatedAt,
}: WithId<UserModel>): UserOutputDTO => ({
  id: _id.toString(),
  email,
  role,
  createdAt,
  updatedAt,
});

export const eventModelMapper = (event: WithId<EventModel>): EventOutputDTO => {
  const { _id, ...rest } = event;
  return { id: _id.toString(), ...rest };
};

export const teamMemberModelMapper = (
  teamMember: WithId<TeamMemberModel>
): TeamMemberOutputDTO => {
  const { _id, ...rest } = teamMember;
  return { id: _id.toString(), ...rest };
};

export const getUserWithTokens = async (userData: WithId<UserModel>) => {
  const user = userModelMapper(userData);
  const tokens = tokensService.generateTokens(user);
  await tokensService.saveToken({
    userId: user.id,
    refreshToken: tokens.refreshToken,
  });

  return {
    ...tokens,
    user,
  };
};

export const authorizeUser = (req: Request) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    throw ApiError.UnauthorizedError();
  }

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw ApiError.ServerError('Internal Server Error');
  }

  const userData = tokensService.validateToken<CustomJwtPayload>(
    accessToken,
    secret
  );
  if (!userData) {
    throw ApiError.UnauthorizedError();
  }

  return userData;
};

export const getMailContent = ({
  heading,
  identifier,
  role,
  teamMemberId,
  teamMemberName,
}: Omit<Mail, 'to'>): MailContent => {
  switch (heading) {
    case 'accountActivate':
      return {
        subject: 'Account activation / Accountaktivierung',
        html: `
          <h3>Dear User!</h3>
          <p>Please, follow this <a href="${CLIENT_ORIGIN}/email-confirmation/${identifier}">link</a> to verify your email address</p>
          <br/>
          <h3>Sehr geehrter Benutzer!</h3>
          <p>Bitte folgen Sie diesem <a href="${CLIENT_ORIGIN}/email-confirmation/${identifier}">Link</a>, um Ihre E-Mail-Adresse zu bestätigen</p>
          `,
      };
    case 'roleChange':
      return {
        subject: 'Role changed / Rolle geändert',
        html: `
          <h3>Dear User!</h3>
          <p>We inform you that your role has been changed to ${role}</p>
          <p><b>All the best</b></p>
          <br/>
          <h3>Sehr geehrter Benutzer!</h3>
          <p>Wir informieren Sie, dass Ihre Rolle in ${role} geändert wurde</p>
          <p><b>Alles Gute</b></p>
          `,
      };
    case 'membershipApprove':
      return {
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
      };
    case 'membershipRequest':
      return {
        subject: 'Team membership request / Teammitgliedschaftsanfrage',
        html: `
          <h3>Dear Website Administrator!</h3>
          <p>Activation request received from the candidate with team member ID: ${teamMemberId}</p>
          <br/>
          <h3>Sehr geehrter Website-Administrator!</h3>
          <p>Aktivierungsanfrage vom Kandidaten mit der Teammitglieds-ID erhalten: ${teamMemberId}</p>
          `,
      };
    case 'membershipSuspend':
      return {
        subject: 'Team membership suspended / Teammitgliedschaft ausgesetzt',
        html: `
          <h3>Hello, ${teamMemberName}!</h3>
          <p>We inform you that your membership in the team has been suspended.</p>
          <p>All the best</p>
          <br/>
          <h3>Hallo, ${teamMemberName}!</h3>
          <p>Wir informieren Sie, dass Ihre Mitgliedschaft im Team ausgesetzt wurde.</p>
          <p>Alles Gute</p>
          `,
      };
    case 'membershipTerminate':
      return {
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
      };
    default:
      return { subject: '', html: '' };
  }
};
