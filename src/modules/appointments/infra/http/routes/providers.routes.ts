import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthentication';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

// By setting the middleware at this point and in this way, we are setting it to run in all routes
providersRouter.use(ensureAuthentication);

/**
 * Providers listing
 * GET http://base_url/providers/
 */
providersRouter.get('/', providersController.index);

export default providersRouter;
