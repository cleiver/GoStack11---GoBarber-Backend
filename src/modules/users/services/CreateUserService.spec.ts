import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let CreateUser: CreateUserService;

describe('User creation', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    CreateUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  /**
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

  it('should be able to create a new user', async () => {
    const user = await CreateUser.execute({
      name: 'John Toe',
      email: 'john@toe.net',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  /**
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

  it('should not allow another user to register with an existing email', async () => {
    await CreateUser.execute({
      name: 'John Toe',
      email: 'toefamily@foot.net',
      password: '123123',
    });

    await expect(
      CreateUser.execute({
        name: 'Jane Toe',
        email: 'toefamily@foot.net',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
