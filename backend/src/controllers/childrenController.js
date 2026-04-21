import Child from '../models/Child.js';
import Transaction from '../models/Transaction.js';

// Get all children
export const getChildren = async (req, res) => {
  try {
    const children = await Child.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: children,
      total: children.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single child with transactions
export const getChild = async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Child.findById(id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found',
      });
    }

    // Get transactions for this child
    const transactions = await Transaction.find({ childId: id }).sort({
      date: -1,
    });

    res.json({
      success: true,
      data: {
        ...child.toObject(),
        transactions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create child
export const createChild = async (req, res) => {
  try {
    const { name, age, notes } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Child name is required',
      });
    }

    const child = new Child({
      name,
      age: age || 0,
      notes: notes || '',
      balance: 0,
      totalSaved: 0,
    });

    await child.save();

    res.status(201).json({
      success: true,
      data: child,
      message: 'Child created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update child
export const updateChild = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, notes } = req.body;

    const child = await Child.findByIdAndUpdate(
      id,
      { name, age, notes },
      { new: true, runValidators: true }
    );

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found',
      });
    }

    res.json({
      success: true,
      data: child,
      message: 'Child updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete child
export const deleteChild = async (req, res) => {
  try {
    const { id } = req.params;

    const child = await Child.findByIdAndDelete(id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found',
      });
    }

    // Also delete all transactions for this child
    await Transaction.deleteMany({ childId: id });

    res.json({
      success: true,
      message: 'Child and associated transactions deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
