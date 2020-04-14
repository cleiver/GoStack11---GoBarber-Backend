import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/Users';

interface LoginDTO {
  email: string;
  password: string;
}

interface UserDTO {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: LoginDTO): Promise<UserDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    delete user.password;

    return { user };
  }
}

export default AuthenticateUserService;
