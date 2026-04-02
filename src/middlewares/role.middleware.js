const permissions = {
  viewer: ['READ_DASHBOARD'],
  analyst: ['READ_RECORD', 'READ_DASHBOARD'],
  admin: [
    'CREATE_RECORD',
    'READ_RECORD',
    'UPDATE_RECORD',
    'DELETE_RECORD',
    'MANAGE_USERS',
    'READ_DASHBOARD'
  ]
};

exports.checkPermission = (action) => {
  return (req, res, next) => {
    if (!permissions[req.user.role].includes(action)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    next();
  };
};