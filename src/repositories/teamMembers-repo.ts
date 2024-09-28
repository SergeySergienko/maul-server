import { FindOptions, WithId } from 'mongodb';
import { teamMemberCollection } from '.';
import { TeamMemberModel } from '../models';
import { QueryDTO } from '../types';

export const teamMembersRepo = {
  async findTeamMember<T extends keyof WithId<TeamMemberModel>>(
    field: T,
    value: WithId<TeamMemberModel>[T]
  ) {
    return await teamMemberCollection.findOne({ [field]: value });
  },

  async findTeamMembers({ limit, sort }: QueryDTO) {
    const options: FindOptions = {};

    if (limit) {
      options.limit = +limit;
    }
    options.sort = { name: sort || 'asc' };

    return await teamMemberCollection.find({}, options).toArray();
  },

  async createTeamMember(teamMember: TeamMemberModel) {
    return await teamMemberCollection.insertOne(teamMember);
  },
};
