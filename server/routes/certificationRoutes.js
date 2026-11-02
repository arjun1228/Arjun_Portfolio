import express from 'express';
import { body } from 'express-validator';
import {
  getAllCertifications,
  createCertification,
  updateCertification,
  deleteCertification
} from '../controllers/certificationController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const certificationValidation = [
  body('title').notEmpty().withMessage('Certification title is required').trim(),
  body('issuer').notEmpty().withMessage('Issuer is required').trim()
];

router.get('/', getAllCertifications);
router.post('/', protect, validate(certificationValidation), createCertification);
router.put('/:id', protect, updateCertification);
router.delete('/:id', protect, deleteCertification);

export default router;
