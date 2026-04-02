const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    if (!email || !password || !name) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already registered' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

  
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json(userObj);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  if (!user.isActive) return res.status(403).json({ msg: 'User inactive' });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};