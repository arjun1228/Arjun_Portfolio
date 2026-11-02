import express from 'express';
import { body } from 'express-validator';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const skillValidation = [
  body('category').notEmpty().withMessage('Skill category is required').trim(),
  body('items').isArray().withMessage('Items must be an array')
];

router.get('/', getAllSkills);
router.post('/', protect, validate(skillValidation), createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;
