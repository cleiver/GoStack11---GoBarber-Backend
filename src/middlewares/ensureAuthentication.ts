import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface tokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as tokenPayLoad;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
