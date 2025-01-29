import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../shared/adapters/jwt.adapter';
import { envs } from '../../../config/envs';

export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const isUserAuth = AuthMiddleware.isUserAuthentication(req);

    const token = isUserAuth ? AuthMiddleware.getAuthorizationHeader(req) : AuthMiddleware.getServiceToen(req);

    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
      const isValidToken = await AuthMiddleware.isValidateToken(isUserAuth, token);

      if (!isValidToken) return res.status(401).json({ error: 'Invalid token' });

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  private static isValidateToken = async (isUserAuth: boolean, token: string) => {
    return isUserAuth ? AuthMiddleware.validateUserToken(token) : AuthMiddleware.validateServiceToken(token);
  };

  private static validateServiceToken = async (serviceToken: string) => {
    if (!serviceToken) return false;

    return serviceToken === envs.SERVICE_SECRET;
  };

  private static validateUserToken = async (token: string) => {
    if (!token) return false;

    const payload = await JwtAdapter.validateToken<{ _id: string }>(token);

    return !!payload;
  };

  private static isUserAuthentication = (req: Request): boolean => {
    const authorization = req.header('Authorization');
    return !!authorization;
  };

  private static getAuthorizationHeader = (req: Request) => {
    const authorization = req.header('Authorization');

    if (!authorization) return '';
    if (!authorization?.startsWith('Bearer')) return '';

    const token = authorization?.split(' ').at(1) || '';

    return token;
  };

  private static getServiceToen = (req: Request) => {
    const serviceToken = req.header('x-service-token');

    if (!serviceToken) return '';

    return serviceToken;
  };
}
