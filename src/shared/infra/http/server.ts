/**
 * This is the entry door to this API world 🚪
 */

import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

// load database configuration
import '@shared/infra/typeorm';

// load dependency injection
import '@shared/container';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();

// so we can access this API from other domains (right now everyone can
// access, but we can restrict it)
app.use(cors());

// so express can understand request body as json
app.use(express.json());

// so we can load our images directly, not as and typescript endpoint
app.use('/files', express.static(uploadConfig.uploadsFolder));

// load all of our routes
app.use(routes);

// Global error handling. Must come after the routes
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    // If it's not an AppError, it's something we didn't handle
    return response.status(500).json({
      status: 'error',
      message: '💣 Something bad happened',
      log: error.message,
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server launched on port 3333');
});
