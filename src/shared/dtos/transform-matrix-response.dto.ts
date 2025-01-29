import { MatrixAnalyseDto } from "./matrix-analyse.dto";

export interface TransformMatrixResponseDto {
    Q: number[][];
    R: number[][];
    analysis: MatrixAnalyseDto;
}