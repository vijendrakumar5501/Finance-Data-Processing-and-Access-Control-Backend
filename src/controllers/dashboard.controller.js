const Record = require('../models/record.model');

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

   
    let matchCondition = {};

    if (userRole !== 'admin') {
      matchCondition.createdBy = userId; 
    }

   
    const summary = await Record.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);

    const totalIncome = summary.find(r => r._id === 'income')?.total || 0;
    const totalExpense = summary.find(r => r._id === 'expense')?.total || 0;

  
   const categoryData = await Record.aggregate([
  { $match: matchCondition },
  {
    $group: {
      _id: { $toLower: '$category' }, 
      total: { $sum: '$amount' }
    }
  }
]);

   
    const monthlyTrends = await Record.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryBreakdown: categoryData,
      monthlyTrends
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};