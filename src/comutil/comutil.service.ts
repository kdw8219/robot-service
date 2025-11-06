import { Injectable } from '@nestjs/common';

@Injectable()
export class ComutilService {
    async withTimeout<T>(promise:Promise<T>, ms:number) : Promise<T> {
        const timeOut = new Promise<never> (
          (_, reject) => setTimeout(() => reject(new Error(`operation timed out after ${ms} ms`)), ms),
        );
    
        return Promise.race([promise, timeOut]);
      }
}
