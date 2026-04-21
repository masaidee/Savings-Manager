import express from 'express';
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentsController.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent);
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
