/**
 * This is the gateway to all routes used in the application
 */

import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

/**
 * All routes that begins with these parameters will be redirected to
 * its respective controller
 */

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);

routes.get('/', (request, response) => {
  response.json({ ping: 'pong' });
});

export default routes;
