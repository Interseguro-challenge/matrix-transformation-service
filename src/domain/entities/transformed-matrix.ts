export class TransformedMatrix {
    private readonly id: string;
    private readonly originalMatrix: number[][];
    private readonly Q: number[][];
    private readonly R: number[][];
    private readonly createdAt: Date;
  
    constructor(id: string, originalMatrix: number[][], Q: number[][], R: number[][]) {
      if (!originalMatrix || originalMatrix.length === 0) {
        throw new Error('Original matrix cannot be empty.');
      }
      
      this.id = id;
      this.originalMatrix = originalMatrix;
      this.Q = Q;
      this.R = R;
      this.createdAt = new Date();
    }
  
    getMatrixId(): string {
      return this.id;
    }
  
    getQ(): number[][] {
      return this.Q;
    }
  
    getR(): number[][] {
      return this.R;
    }
  }
  