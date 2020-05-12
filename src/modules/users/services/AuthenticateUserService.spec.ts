import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

describe('User authentication', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const AuthenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await CreateUser.execute({
      name: 'John Toe',
      email: 'john@toe.net',
      password: '123123',
    });

    const response = await AuthenticateUser.execute({
      email: 'john@toe.net',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should NOT allow a user to authenticate with the wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const AuthenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await CreateUser.execute({
      name: 'John Toe',
      email: 'john@toe.net',
      password: '123123',
    });

    await expect(
      AuthenticateUser.execute({
        email: 'john@toe.net',
        password: 'asdasd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  describe('User authentication', () => {
    it('should NOT allow unregistered users to authenticate', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();

      const AuthenticateUser = new AuthenticateUserService(
        fakeUserRepository,
        fakeHashProvider,
      );

      await expect(
        AuthenticateUser.execute({
          email: 'john@toe.net',
          password: '123123',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });
});
