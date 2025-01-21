import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { loginLimiter } from '../utils/ratelimiter';
import { validateLoginInput, validateSignupInput } from '../middlewares/validation';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

// We need to cast the middleware chain to any to avoid TypeScript errors
router.post('/signup', validateSignupInput as any, AuthController.signup);
router.post('/login', validateLoginInput as any, AuthController.login);
//router.post('/login', [loginLimiter, validateLoginInput] as any[], AuthController.login);
router.post('/logout', authenticateToken as any, AuthController.logout);
router.get('/profile', authenticateToken as any, AuthController.getProfile);

export default router;
