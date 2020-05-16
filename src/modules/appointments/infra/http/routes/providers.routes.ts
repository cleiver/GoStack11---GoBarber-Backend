import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthentication';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

// By setting the middleware at this point and in this way, we are setting it to run in all routes
providersRouter.use(ensureAuthentication);

/**
 * Providers listing
 * GET http://base_url/providers/
 */
providersRouter.get('/', providersController.index);

/**
 * Provider availability
 * GET http://base_url/providers/:id/month-availability
 * GET http://base_url/providers/:id/day-availability
 */
providersRouter.post(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.post(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
