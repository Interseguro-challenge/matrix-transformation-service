import { Matrix, qr, matrix } from "mathjs";

export abstract class MathAdapter {
    static qr(matrixToProcess: number[][]): { Q: number[][], R: number[][] } {
        const mathMatrix: Matrix = matrix(matrixToProcess);

        const { Q, R } = qr(mathMatrix);

        return {
            Q: Q.valueOf() as number[][],
            R: R.valueOf() as number[][]
        };
    }

}