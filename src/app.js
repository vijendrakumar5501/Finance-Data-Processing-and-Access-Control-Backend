const express = require('express');
const app = express();
// const errorHandler = require('./middlewares/error.middleware');

app.use(express.json());

// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/users', require('./routes/user.routes'));
// app.use('/api/records', require('./routes/record.routes'));
// app.use('/api/dashboard', require('./routes/dashboard.routes'));

// app.use(errorHandler);

module.exports = app;