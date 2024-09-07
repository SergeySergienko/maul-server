import { FindOptions, ObjectId } from 'mongodb';
import { userCollection } from '.';
import { UserModel } from '../models';
import { QueryDTO, UserFindDTO, UserUpdateDTO } from '../types/dto-types';

export const usersRepo = {
  async findUser<T extends keyof UserFindDTO>(field: T, value: UserFindDTO[T]) {
    if (field === 'id') {
      return await userCollection.findOne({ _id: new ObjectId(value) });
    }
    return await userCollection.findOne({ [field]: value });
  },

  async findUsers({ limit, sort }: QueryDTO) {
    const options: FindOptions = {};

    if (limit) {
      options.limit = +limit;
    }
    options.sort = { email: sort || 'asc' };

    return await userCollection.find({}, options).toArray();
  },

  async createUser(user: UserModel) {
    return await userCollection.insertOne(user);
  },

  async updateUser(updateData: UserUpdateDTO) {
    const { id, ...fieldsToUpdate } = updateData;

    const updateFields = Object.entries(fieldsToUpdate).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {} as Partial<UserUpdateDTO>
    );

    const result = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateFields, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    return result.value;
  },

  async deleteUser(id: string) {
    return await userCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
