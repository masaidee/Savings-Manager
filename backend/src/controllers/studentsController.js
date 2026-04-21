import Student from '../models/Student.js';
import Room from '../models/Room.js';
import Saving from '../models/Saving.js';

// Get all students (supports ?roomId=xxx filter)
export const getStudents = async (req, res) => {
  try {
    const { roomId } = req.query;
    const query = roomId ? { roomId } : {};

    const students = await Student.find(query)
      .populate('roomId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: students,
      total: students.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single student with savings
export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate('roomId', 'name');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Get savings for this student
    const savings = await Saving.find({ studentId: id }).sort({ date: -1 });

    res.json({
      success: true,
      data: {
        ...student.toObject(),
        savings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create student
export const createStudent = async (req, res) => {
  try {
    const { roomId, name, age, notes } = req.body;

    if (!roomId || !name) {
      return res.status(400).json({
        success: false,
        message: 'Room ID and student name are required',
      });
    }

    // Verify room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    const student = new Student({
      roomId,
      name: name.trim(),
      age: age || 0,
      notes: notes || '',
      balance: 0,
      totalSaved: 0,
    });

    await student.save();

    res.status(201).json({
      success: true,
      data: student,
      message: 'Student created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, notes, roomId } = req.body;

    // If changing room, verify new room exists
    if (roomId) {
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Target room not found',
        });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (age !== undefined) updateData.age = age;
    if (notes !== undefined) updateData.notes = notes;
    if (roomId !== undefined) updateData.roomId = roomId;

    const student = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.json({
      success: true,
      data: student,
      message: 'Student updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete student (and all their savings)
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Delete all savings for this student
    await Saving.deleteMany({ studentId: id });

    res.json({
      success: true,
      message: 'Student and associated savings deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
