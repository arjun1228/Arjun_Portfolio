import express from 'express';
import { body } from 'express-validator';
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experienceController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const experienceValidation = [
  body('role').notEmpty().withMessage('Role is required').trim(),
  body('company').notEmpty().withMessage('Company is required').trim(),
  body('startDate').notEmpty().withMessage('Start date is required').trim(),
  body('bullets').isArray({ min: 1 }).withMessage('At least one bullet point is required')
];

router.get('/', getAllExperiences);
router.post('/', protect, validate(experienceValidation), createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

export default router;
