import express from 'express';
import {
  getTransactions,
  getChildTransactions,
  createTransaction,
  deleteTransaction,
} from '../controllers/transactionsController.js';

const router = express.Router();

router.get('/', getTransactions);
router.post('/', createTransaction);
router.get('/child/:childId', getChildTransactions);
router.delete('/:id', deleteTransaction);

export default router;
