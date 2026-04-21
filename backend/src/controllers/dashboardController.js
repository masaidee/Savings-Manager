import Room from '../models/Room.js';
import Student from '../models/Student.js';
import Saving from '../models/Saving.js';

// Overall dashboard — summary of all rooms, students, savings
export const getOverallDashboard = async (req, res) => {
  try {
    const rooms = await Room.find();
    const students = await Student.find();
    const savings = await Saving.find();

    const totalRooms = rooms.length;
    const totalStudents = students.length;
    const totalSaved = students.reduce((sum, s) => sum + s.balance, 0);
    const averageSavings = totalStudents > 0 ? totalSaved / totalStudents : 0;
    const totalTransactions = savings.length;

    // Deposits and withdrawals count
    const totalDeposits = savings.filter((s) => s.type === 'deposit').length;
    const totalWithdrawals = savings.filter((s) => s.type === 'withdrawal').length;

    // Top savers (top 10)
    const topSavers = [...students]
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 10);

    // Enrich top savers with room name
    const topSaversWithRoom = await Promise.all(
      topSavers.map(async (student) => {
        const room = rooms.find((r) => r._id.toString() === student.roomId.toString());
        return {
          _id: student._id,
          name: student.name,
          balance: student.balance,
          totalSaved: student.totalSaved,
          roomName: room?.name || 'Unknown',
        };
      })
    );

    // Room summaries
    const roomSummaries = await Promise.all(
      rooms.map(async (room) => {
        const roomStudents = students.filter(
          (s) => s.roomId.toString() === room._id.toString()
        );
        const roomTotal = roomStudents.reduce((sum, s) => sum + s.balance, 0);
        return {
          _id: room._id,
          name: room.name,
          studentCount: roomStudents.length,
          totalSaved: parseFloat(roomTotal.toFixed(2)),
        };
      })
    );

    // Recent savings (last 10)
    const recentSavings = await Saving.find()
      .populate('studentId', 'name')
      .sort({ date: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        totalRooms,
        totalStudents,
        totalSaved: parseFloat(totalSaved.toFixed(2)),
        averageSavings: parseFloat(averageSavings.toFixed(2)),
        totalTransactions,
        totalDeposits,
        totalWithdrawals,
        topSavers: topSaversWithRoom,
        roomSummaries,
        recentSavings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Room dashboard — summary for a specific room
export const getRoomDashboard = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    const students = await Student.find({ roomId });
    const studentIds = students.map((s) => s._id);
    const savings = await Saving.find({ studentId: { $in: studentIds } });

    const totalStudents = students.length;
    const totalSaved = students.reduce((sum, s) => sum + s.balance, 0);
    const averageSavings = totalStudents > 0 ? totalSaved / totalStudents : 0;
    const totalTransactions = savings.length;

    // Top savers in this room
    const topSavers = [...students]
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 10)
      .map((s) => ({
        _id: s._id,
        name: s.name,
        balance: s.balance,
        totalSaved: s.totalSaved,
      }));

    // Recent savings in this room (last 10)
    const recentSavings = await Saving.find({ studentId: { $in: studentIds } })
      .populate('studentId', 'name')
      .sort({ date: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        room: {
          _id: room._id,
          name: room.name,
          description: room.description,
        },
        totalStudents,
        totalSaved: parseFloat(totalSaved.toFixed(2)),
        averageSavings: parseFloat(averageSavings.toFixed(2)),
        totalTransactions,
        topSavers,
        recentSavings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
