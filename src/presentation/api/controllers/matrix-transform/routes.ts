import { Router } from 'express';
import { MatrixTransformationController } from './matrix-transformation.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

export class MatrixTransformationRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new MatrixTransformationController();

    router.post('/transform', [AuthMiddleware.validateJWT], controller.transform);

    return router;
  }
}
