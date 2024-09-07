import { ObjectId, WithId } from 'mongodb';
import { TeamMemberModel } from '../models';
import { teamMembersRepo } from '../repositories';
import { storageService } from '.';
import { ApiError } from '../exceptions/api-error';
import { normalizeImage } from '../utils';
import { PostTeamMemberDTO, QueryDTO } from '../types/dto-types';

export const teamMembersService = {
  async findTeamMember(id: string): Promise<WithId<TeamMemberModel>> {
    const teamMember = await teamMembersRepo.findTeamMember(
      '_id',
      new ObjectId(id)
    );
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
    return teamMember;
  },

  async findTeamMembers({ limit, sort }: QueryDTO) {
    const teamMembers = await teamMembersRepo.findTeamMembers({
      limit,
      sort,
    });

    if (!teamMembers) {
      throw ApiError.ServerError('Internal Server Error');
    }
    return teamMembers;
  },

  async createTeamMember({
    name,
    position,
    file,
  }: PostTeamMemberDTO): Promise<WithId<TeamMemberModel>> {
    const candidate = await teamMembersRepo.findTeamMember('name', name);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `Team member with name ${name} already exists`,
        [
          {
            type: 'field',
            value: name,
            msg: 'must be unique',
            path: 'name',
            location: 'body',
          },
        ]
      );
    }

    const containerName = process.env.AZURE_STORAGE_MEMBERS_CONTAINER_NAME;
    if (!containerName) {
      throw ApiError.ServerError('Storage container name is required');
    }

    const { normalizedFileName, resizedImageBuffer } = await normalizeImage(
      file
    );
    if (!normalizedFileName) {
      throw ApiError.BadRequest(409, 'File extension is not allowed');
    }

    const blobFile = await storageService.writeFileToAzureStorage(
      containerName,
      normalizedFileName,
      resizedImageBuffer
    );

    const newTeamMember = {
      name,
      position,
      photo: blobFile.url,
    };
    const result = await teamMembersRepo.createTeamMember(newTeamMember);
    if (!result.insertedId) throw ApiError.ServerError('Internal Server Error');

    return { ...newTeamMember, _id: result.insertedId };
  },
};
