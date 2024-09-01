import { FindOptions, ObjectId } from 'mongodb';
import { userCollection } from '.';
import { UserModel, UserOutputModel, UserUpdateModel } from '../models';
import { GetQueryDto } from '../types';

export const usersRepo = {
  async findUser<T extends keyof UserOutputModel>(
    field: T,
    value: UserOutputModel[T]
  ) {
    return await userCollection.findOne({ [field]: value });
  },

  async findUsers({ limit, sort }: GetQueryDto) {
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

  async updateUser(updateData: UserUpdateModel) {
    const { id, ...fieldsToUpdate } = updateData;

    const updateFields = Object.entries(fieldsToUpdate).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {} as Partial<UserUpdateModel>
    );

    const result = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    return result.value;
  },

  async deleteUser(id: string) {
    return await userCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
