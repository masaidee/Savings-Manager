import Child from '../models/Child.js';
import Transaction from '../models/Transaction.js';

export const getStatistics = async (req, res) => {
  try {
    const children = await Child.find();
    const transactions = await Transaction.find();

    const totalChildren = children.length;
    const totalSaved = children.reduce((sum, child) => sum + child.balance, 0);
    const averageSavings =
      totalChildren > 0 ? totalSaved / totalChildren : 0;

    // Count transactions by type
    const deposits = transactions.filter((t) => t.type === 'deposit').length;
    const withdrawals = transactions.filter(
      (t) => t.type === 'withdrawal'
    ).length;

    // Find top savers
    const topSavers = children
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 5);

    // Calculate savings trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentTransactions = await Transaction.find({
      createdAt: { $gte: sevenDaysAgo },
    });

    const recentDeposits = recentTransactions
      .filter((t) => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({
      success: true,
      data: {
        summary: {
          totalChildren,
          totalSaved: parseFloat(totalSaved.toFixed(2)),
          averageSavings: parseFloat(averageSavings.toFixed(2)),
          totalTransactions: transactions.length,
          totalDeposits: deposits,
          totalWithdrawals: withdrawals,
        },
        topSavers: topSavers.map((child) => ({
          _id: child._id,
          name: child.name,
          balance: child.balance,
        })),
        recentActivity: {
          depositsLast7Days: recentDeposits,
          transactionsLast7Days: recentTransactions.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
