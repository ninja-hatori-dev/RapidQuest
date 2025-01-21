import { Request, Response, NextFunction } from 'express';
import { Validators } from '../utils/validators';

export const validateSignupInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password} = req.body;

  if (!email || !password ) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['email', 'password', 'name'],
    });
  }

  if (!Validators.isValidEmail(email)) {
    return res.status(400).json({
      error: 'Invalid email format',
    });
  }

  if (!Validators.isValidPassword(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character',
    });
  }

  next();
};

export const validateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['email', 'password'],
    });
  }

  if (!Validators.isValidEmail(email)) {
    return res.status(400).json({
      error: 'Invalid email format',
    });
  }

  next();
};