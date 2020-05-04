import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

// http://base_url/sessions/
sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
