import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/errorhandler';
import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction 
): void => {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.message,
      status: error.statusCode,
    });
    return;
  }

  // Default error
  res.status(500).json({
    error: 'Internal server error',
    status: 500,
  });
};

// Global Not Found handler
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    error: 'Route not found',
    status: 404,
    path: req.path,
    method: req.method,
  });
};
