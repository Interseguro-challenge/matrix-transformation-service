import { MatrixAnalyseDto } from "../../shared/dtos/matrix-analyse.dto";

export interface MatrixAnalyseService {
    analyze(QMatrix: number[][], RMatrix: number[][]): Promise<MatrixAnalyseDto>;
}