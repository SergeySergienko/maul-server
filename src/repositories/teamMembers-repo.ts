import { FindOptions, ObjectId } from 'mongodb';
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
      {
        $set: { isActivated: true, teamRole: 'MEMBER', updatedAt: new Date() },
      },
      { returnDocument: 'after' }
    );

    return result.value;
  },

  async updateTeamMember(updateData: TeamMemberUpdateBdDTO) {
    const { id, ...fieldsToUpdate } = updateData;

    const updateFields = Object.entries(fieldsToUpdate).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {} as Partial<TeamMemberUpdateBdDTO>
    );

    const result = await teamMemberCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateFields, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    return result.value;
  },

  async deleteTeamMember(id: string) {
    return await teamMemberCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
