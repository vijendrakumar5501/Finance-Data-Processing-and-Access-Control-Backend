const Record = require('../models/record.model');

exports.createRecord = async (req, res) => {
  const record = await Record.create({
    ...req.body,
    createdBy: req.user._id
  });
  res.status(201).json(record);
};

exports.getRecords = async (req, res) => {
  const { type, category, startDate, endDate } = req.query;

  let query = {};
  if (type) query.type = type;
  if (category) query.category = category;

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const records = await Record.find(query);
  res.json(records);
};

exports.updateRecord = async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(record);
};

exports.deleteRecord = async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};