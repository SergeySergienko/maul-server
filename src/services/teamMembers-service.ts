import { WithId } from 'mongodb';
import { TeamMemberModel } from '../models';
import { teamMembersRepo } from '../repositories';
import { GetTeamMembersQueryDto, PostTeamMemberDto } from '../types';
import { storageService } from '.';
import { ApiError } from '../exceptions/api-error';

export const teamMembersService = {
  async findTeamMembers({ limit, sort }: GetTeamMembersQueryDto) {
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
  }: PostTeamMemberDto): Promise<WithId<TeamMemberModel>> {
    if (!file) {
      throw ApiError.BadRequest(409, 'Photo is required', [
        {
          type: 'field',
          value: file || 'undefined',
          msg: 'photo is required',
          path: 'photo',
          location: 'body',
        },
      ]);
    }
    const candidate = await teamMembersRepo.findTeamMember('name', name);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `Team member with name ${name} already exists`,
        [
          {
            type: 'field',
            value: name,
            msg: 'team member name must be unique',
            path: 'name',
            location: 'body',
          },
        ]
      );
    }
    const blobFile = await storageService.writeFileToAzureStorage(
      file.originalname,
      file.buffer
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
