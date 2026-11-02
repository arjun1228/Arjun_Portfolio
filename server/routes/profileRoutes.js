import express from 'express';
import { body } from 'express-validator';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const profileValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email')
];

router.get('/', getProfile);
router.put('/', protect, validate(profileValidation), updateProfile);

export default router;
