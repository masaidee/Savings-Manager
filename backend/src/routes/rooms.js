import express from 'express';
import {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/roomsController.js';

const router = express.Router();

router.get('/', getRooms);
router.post('/', createRoom);
router.get('/:id', getRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;
