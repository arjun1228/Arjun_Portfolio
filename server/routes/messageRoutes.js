import express from 'express';
import {
  getAllMessages,
  updateMessageStatus,
  deleteMessage
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All message routes require admin auth
router.get('/', getAllMessages);
router.patch('/:id', updateMessageStatus);
router.delete('/:id', deleteMessage);

export default router;
