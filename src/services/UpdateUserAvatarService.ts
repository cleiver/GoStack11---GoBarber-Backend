import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/Users';

import uploadConfig from '../config/upload';

interface Request {
  userId: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new Error('Only existing users can change their avatar');
    }

    if (user.avatar) {
      const currentAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatar,
      );

      const currentAvatarExists = await fs.promises.stat(currentAvatarFilePath);

      if (currentAvatarExists) {
        await fs.promises.unlink(currentAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}
