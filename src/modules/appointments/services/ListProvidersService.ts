/**
 * Service classes execute one and only one business logic action
 */

import User from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  // typescript hack to automatically create an private property with this name and type
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.FindAllProviders({
      except_user_id: user_id,
    });

    if (!users) {
      throw new AppError('No providers available to list');
    }

    return users;
  }
}
