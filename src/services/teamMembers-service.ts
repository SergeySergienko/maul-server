import { ObjectId, WithId } from 'mongodb';
import { TeamMemberModel } from '../models';
import { teamMembersRepo } from '../repositories';
import { storageService } from '.';
import { ApiError } from '../exceptions/api-error';
import { normalizeImage, teamMemberModelMapper } from '../utils';
import { QueryDTO, TeamMemberInputDTO, TeamMemberOutputDTO } from '../types';

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
    const containerName = process.env
      .AZURE_STORAGE_MEMBERS_CONTAINER_NAME as string;

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

    return teamMemberModelMapper({ ...newTeamMember, _id: insertedId });
  },
};
