import Room from '../models/Room.js';
import Student from '../models/Student.js';

// Get all rooms (with student count and total saved)
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });

    // Enrich each room with student count and total saved
    const roomsWithStats = await Promise.all(
      rooms.map(async (room) => {
        const students = await Student.find({ roomId: room._id });
        const studentCount = students.length;
        const totalSaved = students.reduce((sum, s) => sum + s.balance, 0);
        return {
          ...room.toObject(),
          studentCount,
          totalSaved,
        };
      })
    );

    res.json({
      success: true,
      data: roomsWithStats,
      total: roomsWithStats.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single room with students
export const getRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    const students = await Student.find({ roomId: id }).sort({ name: 1 });

    res.json({
      success: true,
      data: {
        ...room.toObject(),
        students,
        studentCount: students.length,
        totalSaved: students.reduce((sum, s) => sum + s.balance, 0),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create room
export const createRoom = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Room name is required',
      });
    }

    // Check duplicate name
    const existing = await Room.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Room name already exists',
      });
    }

    const room = new Room({
      name: name.trim(),
      description: description || '',
    });

    await room.save();

    res.status(201).json({
      success: true,
      data: { ...room.toObject(), studentCount: 0, totalSaved: 0 },
      message: 'Room created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update room
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check duplicate name (exclude self)
    if (name) {
      const existing = await Room.findOne({ name: name.trim(), _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Room name already exists',
        });
      }
    }

    const room = await Room.findByIdAndUpdate(
      id,
      { name: name?.trim(), description },
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    res.json({
      success: true,
      data: room,
      message: 'Room updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete room (and all students + their savings)
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findByIdAndDelete(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    // Delete all students in this room and their savings
    const students = await Student.find({ roomId: id });
    const studentIds = students.map((s) => s._id);

    const Saving = (await import('../models/Saving.js')).default;
    await Saving.deleteMany({ studentId: { $in: studentIds } });
    await Student.deleteMany({ roomId: id });

    res.json({
      success: true,
      message: 'Room and all associated students and savings deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
