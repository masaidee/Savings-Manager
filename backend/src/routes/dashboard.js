import express from 'express';
import {
  getOverallDashboard,
  getRoomDashboard,
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', getOverallDashboard);
router.get('/room/:roomId', getRoomDashboard);

export default router;
