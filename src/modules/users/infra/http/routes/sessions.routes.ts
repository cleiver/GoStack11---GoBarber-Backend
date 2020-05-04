import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

/**
 * Session creation
 * POST http://base_url/sessions/
 */
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
