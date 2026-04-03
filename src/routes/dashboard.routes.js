const router = require('express').Router();
const ctrl = require('../controllers/dashboard.controller');
const { auth } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/role.middleware');

router.get('/', auth, checkPermission('READ_DASHBOARD'), ctrl.getSummary);

module.exports = router;