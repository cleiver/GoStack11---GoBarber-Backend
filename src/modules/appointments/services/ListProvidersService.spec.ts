import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let ListProviders: ListProvidersService;

describe('Providers ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    ListProviders = new ListProvidersService(fakeUsersRepository);
  });

  /**
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

  it('should be able to list all providers except the logged user', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'User One',
      email: 'userone@email.com',
      password: 'password',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User Two',
      email: 'usertwo@email.com',
      password: 'password',
    });

    const logged_user = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'user@email.com',
      password: 'password',
    });

    const providers = await ListProviders.execute({ user_id: logged_user.id });

    expect(providers).toEqual([user1, user2]);
  });
});
