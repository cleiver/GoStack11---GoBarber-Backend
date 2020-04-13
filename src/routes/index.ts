import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ ping: 'pong' });
});

export default routes;
