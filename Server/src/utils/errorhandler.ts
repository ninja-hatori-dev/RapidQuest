import { logger } from "./logger";

export class AppError extends Error {
    constructor(
      public statusCode: number,
      public message: string,
      public isOperational = true
    ) {
      super(message);
      Object.setPrototypeOf(this, AppError.prototype);
    }
  }
  
  export const handleError = (error: AppError | Error) => {
    logger.error('Error:', {
      message: error.message,
      stack: error.stack,
      isOperational: error instanceof AppError ? error.isOperational : false,
    });
};