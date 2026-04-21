import Saving from '../models/Saving.js';
import Student from '../models/Student.js';

// Get savings (supports ?studentId=xxx filter)
export const getSavings = async (req, res) => {
  try {
    const { studentId } = req.query;
    const query = studentId ? { studentId } : {};

    const savings = await Saving.find(query)
      .populate('studentId', 'name')
      .sort({ date: -1 });

    res.json({
      success: true,
      data: savings,
      total: savings.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create saving (deposit or withdrawal)
export const createSaving = async (req, res) => {
  try {
    const { studentId, type, amount, notes, date } = req.body;

    // Validation
    if (!studentId || !type || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Student ID, type, and amount are required',
      });
    }

    if (!['deposit', 'withdrawal'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be "deposit" or "withdrawal"',
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0',
      });
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Check sufficient balance for withdrawal
    if (type === 'withdrawal' && student.balance < amount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Current balance: ${student.balance}`,
      });
    }

    // Create saving record
    const saving = new Saving({
      studentId,
      type,
      amount,
      notes: notes || '',
      date: date ? new Date(date) : new Date(),
    });

    await saving.save();

    // Update student balance
    if (type === 'deposit') {
      student.balance += amount;
      student.totalSaved += amount;
    } else {
      student.balance -= amount;
    }

    await student.save();

    res.status(201).json({
      success: true,
      data: {
        saving,
        studentBalance: student.balance,
      },
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} recorded successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete saving (with balance reversal)
export const deleteSaving = async (req, res) => {
  try {
    const { id } = req.params;

    const saving = await Saving.findByIdAndDelete(id);

    if (!saving) {
      return res.status(404).json({
        success: false,
        message: 'Saving record not found',
      });
    }

    // Reverse the balance on student
    const student = await Student.findById(saving.studentId);

    if (student) {
      if (saving.type === 'deposit') {
        student.balance -= saving.amount;
        student.totalSaved -= saving.amount;
      } else {
        student.balance += saving.amount;
      }

      // Ensure no negative values
      student.balance = Math.max(0, student.balance);
      student.totalSaved = Math.max(0, student.totalSaved);

      await student.save();
    }

    res.json({
      success: true,
      message: 'Saving record deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
