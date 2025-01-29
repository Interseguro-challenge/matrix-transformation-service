import { TransformMatrixUseCase } from '../../../../application/transform-matrix.use-case';
import { MatrixAnalyseServiceImpl } from '../../../../infrastructure/services/matrix-analyze.service.impl';
import { HTTP_STATUS } from '../../constants/http-codes';
import { Request, Response } from 'express';
import { handleError } from '../../utils/handle.error';

export class MatrixTransformationController {
  private readonly matrixTransformationService: MatrixAnalyseServiceImpl;

  constructor() {
    this.matrixTransformationService = new MatrixAnalyseServiceImpl();
  }

  transform = (req: Request, res: Response) => {
    new TransformMatrixUseCase(this.matrixTransformationService)
      .execute(req.body)
      .then(data => res.status(HTTP_STATUS.OK).send(data))
      .catch(error => handleError(error, res));
  };
}
