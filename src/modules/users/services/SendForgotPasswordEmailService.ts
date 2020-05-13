/**
 * Service classes execute one and only one business logic action
 */

import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/providers/MailProvider/models/IMailprovider';

import IUserRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
// import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  // typescript hack to automatically create an private property with this name and type
  constructor(
    @inject('UsersRepository') private usersRepository: IUserRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      'Forgot Password',
      `We received your request for password reset. Your token is ${token}`,
    );
  }
}