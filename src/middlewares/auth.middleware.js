const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ msg: 'Unauthorized' });
  }
};