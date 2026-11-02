import express from 'express';
import { body } from 'express-validator';
import { login, logout, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

router.post('/login', authLimiter, validate(loginValidation), login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
