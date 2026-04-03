const Record = require('../models/record.model');

exports.createRecord = async (req, res) => {
  const record = await Record.create({
    ...req.body,
    category: req.body.category.toLowerCase(),
    createdBy: req.user._id
  });
  res.status(201).json(record);
};



exports.getRecords = async (req, res) => {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

   
    if (type) {
      query.type = type;
    }

    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    
    const records = await Record.find(query)
      .sort({ date: -1 }) 
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      total: records.length,
      page: Number(page),
      data: records
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(record);
};

exports.deleteRecord = async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};