import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../exceptions/api-error';
import { UserInputModel, UserModel, UserUpdateModel } from '../models';
import { usersRepo } from '../repositories';
import { userModelMapper } from '../utils';
import { GetQueryDto } from '../types';

export const usersService = {
  async findUsers({ limit, sort }: GetQueryDto) {
    const users = await usersRepo.findUsers({ limit, sort });
    if (!users) {
      throw ApiError.ServerError('Internal Server Error');
    }
    return users.map(userModelMapper);
  },

  async createUser({ email, password: userPassword }: UserInputModel) {
    const candidate = await usersRepo.findUser('email', email);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `User with email ${email} already exists`,
        [
          {
            type: 'field',
            value: email,
            msg: 'email address must be unique',
            path: 'email',
            location: 'body',
          },
        ]
      );
    }

    const hashPassword = await bcrypt.hash(userPassword, 7); // todo: move to auth-service
    const identifier = uuidv4();
    const newUser: UserModel = {
      email,
      password: hashPassword,
      role: 'USER',
      activationToken: identifier,
    };

    const { insertedId } = await usersRepo.createUser(newUser);
    if (!insertedId) throw ApiError.ServerError('User was not inserted');

    // await mailService.sendActivationMail(email, identifier);

    return userModelMapper({ ...newUser, _id: insertedId });
  },

  async updateUser(userDataToUpdate: UserUpdateModel) {
    const updatedUser = await usersRepo.updateUser(userDataToUpdate);
    if (!updatedUser) {
      throw ApiError.NotFound(
        `User with id: ${userDataToUpdate.id} wasn't found`
      );
    }
    return userModelMapper(updatedUser);
  },

  async deleteUser(id: string) {
    const { deletedCount } = await usersRepo.deleteUser(id);
    if (deletedCount !== 1) {
      throw ApiError.NotFound(`User with id: ${id} wasn't found`);
    }
    return id;
  },
};
