import { FindOptions, ObjectId, WithId } from 'mongodb';
import { teamMemberCollection } from '.';
import { TeamMemberModel } from '../models';
import { QueryDTO, TeamMemberFindDTO, TeamMemberUpdateBdDTO } from '../types';

export const teamMembersRepo = {
  async findTeamMember<T extends keyof TeamMemberFindDTO>(
    field: T,
    value: TeamMemberFindDTO[T]
  ) {
    if (field === 'id') {
      return await teamMemberCollection.findOne({ _id: new ObjectId(value) });
    }

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

  async activateTeamMember(id: string) {
    const result = await teamMemberCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { isActivated: true, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    return result.value;
  },

  async updateTeamMember(updateData: TeamMemberUpdateBdDTO) {
    const { id, ...fieldsToUpdate } = updateData;

    const result = await teamMemberCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...fieldsToUpdate, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    return result.value;
  },

  async deleteTeamMember(id: string) {
    return await teamMemberCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
