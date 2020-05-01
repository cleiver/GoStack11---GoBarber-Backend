/**
 * This is the gateway to all routes used in the application
 */

import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

/**
 * All routes that begins with these parameters will be redirected to
 * its respective controller
 */

routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
  response.json({ ping: 'pong' });
});

export default routes;
