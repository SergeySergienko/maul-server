import { Filter, FindOptions, ObjectId } from 'mongodb';
import { teamMemberCollection } from '.';
import { TeamMemberModel } from '../models';
import {
  TeamMemberFindDTO,
  TeamMembersFindDTO,
  TeamMemberStatusDTO,
  TeamMemberUpdateBdDTO,
} from '../types';

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

  async findTeamMembers({ limit, sort, status }: TeamMembersFindDTO) {
    const options: FindOptions = {};
    const filter: Filter<TeamMemberModel> = {};

    if (limit) {
      options.limit = +limit;
    }
    options.sort = { name: sort || 'asc' };

    if (status) {
      filter.status = status;
    }

    return await teamMemberCollection.find(filter, options).toArray();
  },

  async createTeamMember(teamMember: TeamMemberModel) {
    return await teamMemberCollection.insertOne(teamMember);
  },

  async changeStatus({ id, status }: TeamMemberStatusDTO) {
    const result = await teamMemberCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: { status, updatedAt: new Date() },
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
