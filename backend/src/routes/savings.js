import express from 'express';
import {
  getSavings,
  createSaving,
  deleteSaving,
} from '../controllers/savingsController.js';

const router = express.Router();

router.get('/', getSavings);
router.post('/', createSaving);
router.delete('/:id', deleteSaving);

export default router;
