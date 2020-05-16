import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthentication';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthentication);

/**
 * Session creation
 * POST http://base_url/profile/
 */
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
