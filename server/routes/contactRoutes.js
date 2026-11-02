import express from 'express';
import { body } from 'express-validator';
import { handleContactSubmit } from '../controllers/contactController.js';
import { validate } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ min: 3, max: 150 }).withMessage('Subject must be between 3 and 150 characters'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
];

router.post('/', contactLimiter, validate(contactValidation), handleContactSubmit);

export default router;
