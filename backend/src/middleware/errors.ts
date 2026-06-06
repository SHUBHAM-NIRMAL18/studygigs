import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Log error
  console.error(`[ERROR] ${req.method} ${req.path} - Status: ${status}`);
  console.error(err.stack || err);

  // Send standardized response
  return res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : err.message || 'An error occurred',
    ...(isProduction ? {} : { details: err.message, stack: err.stack })
  });
}
