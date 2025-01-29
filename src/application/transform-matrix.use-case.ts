import { CustomError } from '../domain/errors/custom.error';
import { MatrixAnalyseService } from '../domain/services/matrix-analyse.service';
import { MathAdapter } from '../shared/adapters/math.adapter';
import { TransformMatrixRequestDto } from '../shared/dtos/transform-matrix-request.dto';
import { TransformMatrixResponseDto } from '../shared/dtos/transform-matrix-response.dto';

type MatrixQR = (matrixToProcess: number[][]) => { Q: number[][]; R: number[][] };

export class TransformMatrixUseCase {
  constructor(
    private readonly matrixAnalyseService: MatrixAnalyseService,
    private readonly matrixQR: MatrixQR = MathAdapter.qr
  ) {}

  async execute({ matrix }: TransformMatrixRequestDto): Promise<TransformMatrixResponseDto> {
    try {
      this.ensureMatrixIsValid(matrix);

      const { Q, R } = this.matrixQR(matrix);

      const matrixAnalysisResult = await this.matrixAnalyseService.analyze(Q, R);

      return {
        Q,
        R,
        analysis: matrixAnalysisResult,
      };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError('An error occurred while processing the matrix.');
    }
  }

  private ensureMatrixIsValid(matrix: number[][]): void {
    this.ensureMatrixIsNotEmpty(matrix);
    this.ensure2DMatrix(matrix);
    this.ensureRectangularMatrix(matrix);
  }

  private ensureMatrixIsNotEmpty(matrix: number[][]): void {
    if (!matrix || matrix.length === 0) throw CustomError.badRequest('Matrix cannot be empty.');
  }

  private ensure2DMatrix(matrix: number[][]): void {
    if (!matrix.every(row => Array.isArray(row))) throw CustomError.badRequest('Matrix must be 2D.');
  }

  private ensureRectangularMatrix(matrix: number[][]): void {
    const firstRowLength = matrix[0].length;

    for (let i = 1; i < matrix.length; i++) {
      if (matrix[i].length !== firstRowLength) throw CustomError.badRequest('Matrix must be rectangular.');
    }
  }
}
