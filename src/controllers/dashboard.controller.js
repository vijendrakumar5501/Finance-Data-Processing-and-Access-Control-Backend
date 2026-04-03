const Record = require('../models/record.model');

exports.getSummary = async (req, res) => {
  const result = await Record.aggregate([
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }
    }
  ]);

  const income = result.find(r => r._id === 'income')?.total || 0;
  const expense = result.find(r => r._id === 'expense')?.total || 0;

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  });
};