import { tokenCollection } from '.';
import { TokenModel } from '../models';

export const tokensRepo = {
  async findToken<T extends keyof TokenModel>(field: T, value: TokenModel[T]) {
    return await tokenCollection.findOne({ [field]: value });
  },

  async createToken({ userId, refreshToken }: TokenModel) {
    return await tokenCollection.insertOne({
      userId,
      refreshToken,
    });
  },

  async updateToken({ userId, refreshToken }: TokenModel) {
    return await tokenCollection.updateOne(
      { userId },
      { $set: { refreshToken } }
    );
  },

  async deleteToken(refreshToken: string) {
    return await tokenCollection.deleteOne({ refreshToken });
  },
};
