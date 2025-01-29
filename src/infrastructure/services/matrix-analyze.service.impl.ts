import axios, { AxiosInstance } from 'axios';
import { MatrixAnalyseService } from '../../domain/services/matrix-analyse.service';
import { MatrixAnalyseDto } from '../../shared/dtos/matrix-analyse.dto';
import { envs } from '../../config/envs';

export class MatrixAnalyseServiceImpl implements MatrixAnalyseService {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: envs.MATRIX_ANALYSIS_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-service-token': envs.SERVICE_SECRET,
      },
    });
  }

  async analyze(QMatrix: number[][], RMatrix: number[][]): Promise<MatrixAnalyseDto> {
    const matrixAnalysisResponse = await this.http.post<MatrixAnalyseDto>('/api/v1/matrix/analyse', {
      QMatrix,
      RMatrix,
    });

    return matrixAnalysisResponse.data;
  }
}
