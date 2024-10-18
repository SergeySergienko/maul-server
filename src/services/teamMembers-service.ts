import { ObjectId } from 'mongodb';
import { TeamMemberModel } from '../models';
import { teamMembersRepo, usersRepo } from '../repositories';
import { storageService, usersService } from '.';
import { ApiError } from '../exceptions/api-error';
import { normalizeImage, teamMemberModelMapper } from '../utils';
import {
  QueryDTO,
  TeamMemberInputDTO,
  TeamMemberOutputDTO,
  TeamMemberUpdateBdDTO,
  TeamMemberUpdateDTO,
} from '../types';
import mailService from './mail-service';

const containerName = process.env
  .AZURE_STORAGE_MEMBERS_CONTAINER_NAME as string;

export const teamMembersService = {
  async findTeamMember(id: string) {
    const teamMember = await teamMembersRepo.findTeamMember('id', id);
    if (!teamMember) {
      throw ApiError.NotFound(`Team member with id: ${id} wasn't found`, [
        {
          type: 'field',
          value: id,
          msg: 'not found',
          path: 'id',
          location: 'params',
        },
      ]);
    }

    return teamMemberModelMapper(teamMember);
  },

  async findTeamMemberByUserId(userId: string) {
    const teamMember = await teamMembersRepo.findTeamMember('userId', userId);
    if (!teamMember) return;

    return teamMemberModelMapper(teamMember);
  },

  async findTeamMembers({ limit, sort }: QueryDTO) {
    const teamMembers = await teamMembersRepo.findTeamMembers({
      limit,
      sort,
    });

    if (!teamMembers) {
      throw ApiError.ServerError('Internal Server Error');
    }

    return teamMembers.map(teamMemberModelMapper);
  },

  async createTeamMember({
    userId,
    name,
    position,
    photo,
    slogan,
  }: TeamMemberInputDTO): Promise<TeamMemberOutputDTO> {
    // const { normalizedFileName, resizedImageBuffer } = await normalizeImage(
    //   file
    // );
    // if (!normalizedFileName) {
    //   throw ApiError.BadRequest(409, 'File extension is not allowed');
    // }
    const blobFile = await storageService.writeFileToAzureStorage(
      containerName,
      photo.originalname,
      photo.buffer
    );

    const newTeamMember: TeamMemberModel = {
      userId,
      name,
      position,
      photo: blobFile.url,
      slogan,
      isActivated: false,
      createdAt: new Date(),
    };
    const { insertedId } = await teamMembersRepo.createTeamMember(
      newTeamMember
    );
    if (!insertedId) throw ApiError.ServerError('Internal Server Error');

    await usersService.updateUser({ id: userId, role: 'CANDIDATE' });

    const admins = await usersService.findUsers({ role: 'ADMIN' });
    await Promise.all(
      admins.map((admin) =>
        mailService.sendTeamMembershipRequestMail(
          admin.email,
          insertedId.toString()
        )
      )
    );

    return teamMemberModelMapper({ ...newTeamMember, _id: insertedId });
  },

  async activateTeamMember(id: string) {
    const activatedTeamMember = await teamMembersRepo.activateTeamMember(id);
    if (!activatedTeamMember) {
      throw ApiError.NotFound(`Team member with id: ${id} wasn't found`);
    }

    // todo: create usersService.findUser
    const userId = activatedTeamMember.userId;
    const user = await usersRepo.findUser('id', userId);
    if (!user) {
      throw ApiError.NotFound(`User with id: ${userId} wasn't found`);
    }
    await usersRepo.updateUser({ id: userId, role: 'MEMBER' });

    await mailService.sendTeamMembershipApprovedMail(
      user.email,
      activatedTeamMember.name
    );

    return teamMemberModelMapper(activatedTeamMember);
  },

  async updateTeamMember({
    id,
    name,
    position,
    photo,
    slogan,
  }: TeamMemberUpdateDTO) {
    const teamMemberToUpdate: TeamMemberUpdateBdDTO = {
      id,
      name,
      position,
      slogan,
    };

    if (photo) {
      const teamMember = await this.findTeamMember(id);

      const res = await storageService.deleteFileFromAzureStorage(
        teamMember.photo
      );
      if (res.errorCode) {
        throw ApiError.ServerError('Can not delete blob file');
      }

      const blobFile = await storageService.writeFileToAzureStorage(
        containerName,
        photo.originalname,
        photo.buffer
      );

      teamMemberToUpdate.photo = blobFile.url;
    }

    const updatedTeamMember = await teamMembersRepo.updateTeamMember(
      teamMemberToUpdate
    );
    if (!updatedTeamMember) {
      throw ApiError.NotFound(`Team member with id: ${id} wasn't found`);
    }

    return teamMemberModelMapper(updatedTeamMember);
  },

  async deleteTeamMember(id: string) {
    const teamMemberToDelete = await this.findTeamMember(id);
    const res = await storageService.deleteFileFromAzureStorage(
      teamMemberToDelete.photo
    );

    if (res.errorCode) {
      throw ApiError.ServerError('Can not delete blob file');
    }

    const { deletedCount } = await teamMembersRepo.deleteTeamMember(id);
    if (deletedCount !== 1) {
      throw ApiError.NotFound(`Team member with id: ${id} wasn't found`);
    }

    const userId = teamMemberToDelete.userId;
    const user = await usersRepo.findUser('id', userId);
    if (!user) {
      throw ApiError.NotFound(`User with id: ${userId} wasn't found`);
    }
    await usersRepo.updateUser({ id: userId, role: 'USER' });

    await mailService.sendTeamMembershipTerminatedMail(
      user.email,
      teamMemberToDelete.name
    );

    return id;
  },
};
