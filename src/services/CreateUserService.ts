/**
 * Service classes execute one and only one business logic action
 */

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';
import AppError from '../errors/AppError';

interface UserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: UserDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
