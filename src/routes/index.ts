import { Router } from 'express';

import appointmentsRouter from './appointments.routes';

const routes = Router();

// for every request to http://[url]/appointment, use this router
routes.use('/appointments', appointmentsRouter);

// http://[url]/
routes.get('/', (request, response) => {
  response.json({ ping: 'pong' });
});

export default routes;
