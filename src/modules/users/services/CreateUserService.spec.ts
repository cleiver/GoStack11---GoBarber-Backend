import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('User creation', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await CreateUser.execute({
      name: 'John Toe',
      email: 'john@toe.net',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not allow another user to register with an existing email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await CreateUser.execute({
      name: 'John Toe',
      email: 'toefamily@foot.net',
      password: '123123',
    });

    expect(
      CreateUser.execute({
        name: 'Jane Toe',
        email: 'toefamily@foot.net',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
