import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthentication';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

/**
 * Here we used the authentication check middleware directly in the routes
 * because we need the user creation to be available to logged out users.
 */

// http://base_url/users/
usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { name, email, password } = request.body;

  const userService = new CreateUserService(usersRepository);

  const user = await userService.execute({ name, email, password });

  return response.send(user);
});

// http://base_url/users/avatar
usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  },
);

/**
 * First it will check if the user is logged, then it will upload the file and
 * after it will execute the logic defined in the route
 */

export default usersRouter;
