import Transaction from '../models/Transaction.js';
import Child from '../models/Child.js';

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const { childId } = req.query;

    let query = {};
    if (childId) {
      query.childId = childId;
    }

    const transactions = await Transaction.find(query)
      .populate('childId', 'name')
      .sort({ date: -1 });

    res.json({
      success: true,
      data: transactions,
      total: transactions.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get transactions for a specific child
export const getChildTransactions = async (req, res) => {
  try {
    const { childId } = req.params;

    const transactions = await Transaction.find({ childId }).sort({
      date: -1,
    });

    res.json({
      success: true,
      data: transactions,
      total: transactions.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create transaction (deposit or withdrawal)
export const createTransaction = async (req, res) => {
  try {
    const { childId, type, amount, notes, date } = req.body;

    // Validation
    if (!childId || !type || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Child ID, transaction type, and amount are required',
      });
    }

    if (!['deposit', 'withdrawal'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Transaction type must be "deposit" or "withdrawal"',
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0',
      });
    }

    // Check if child exists
    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found',
      });
    }

    // Check if withdrawal amount is sufficient
    if (type === 'withdrawal' && child.balance < amount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Current balance: ${child.balance}`,
      });
    }

    // Create transaction
    const transaction = new Transaction({
      childId,
      type,
      amount,
      notes: notes || '',
      date: date ? new Date(date) : new Date(),
    });

    await transaction.save();

    // Update child balance
    if (type === 'deposit') {
      child.balance += amount;
      child.totalSaved += amount;
    } else if (type === 'withdrawal') {
      child.balance -= amount;
    }

    await child.save();

    res.status(201).json({
      success: true,
      data: {
        transaction,
        childBalance: child.balance,
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

// Delete transaction (with balance adjustment)
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Reverse the transaction on child balance
    const child = await Child.findById(transaction.childId);

    if (child) {
      if (transaction.type === 'deposit') {
        child.balance -= transaction.amount;
        child.totalSaved -= transaction.amount;
      } else if (transaction.type === 'withdrawal') {
        child.balance += transaction.amount;
      }

      await child.save();
    }

    res.json({
      success: true,
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
