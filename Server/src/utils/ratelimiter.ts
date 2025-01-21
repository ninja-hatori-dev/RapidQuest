import rateLimit from 'express-rate-limit';
import { constants } from './constant';

export const generalLimiter = rateLimit({
  windowMs: constants.RATE_LIMIT.WINDOW_MS,
  max: constants.RATE_LIMIT.MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later.',
});

export const loginLimiter =rateLimit({
    windowMs: constants.RATE_LIMIT.LOGIN_WINDOW_MS,
  max: constants.RATE_LIMIT.MAX_LOGIN_ATTEMPTS,
  message: 'Too many login attempts from this IP, please try again later.',
});

