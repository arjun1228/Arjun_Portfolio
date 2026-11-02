import express from 'express';
import { body } from 'express-validator';
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const projectValidation = [
  body('title').notEmpty().withMessage('Project title is required').trim(),
  body('description').notEmpty().withMessage('Description is required').trim(),
  body('tech').isArray({ min: 1 }).withMessage('At least one technology is required')
];

router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', protect, validate(projectValidation), createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
