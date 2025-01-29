import { Router } from 'express';
import { MatrixTransformationRoutes } from './controllers/matrix-transform/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/matrix-transform', MatrixTransformationRoutes.routes);

    return router;
  }
}
