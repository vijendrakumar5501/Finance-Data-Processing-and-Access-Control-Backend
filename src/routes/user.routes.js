const router = require('express').Router();
const ctrl = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/role.middleware');

router.get('/', auth, checkPermission('MANAGE_USERS'), ctrl.getUsers);
router.get('/:id', auth, checkPermission('MANAGE_USERS'), ctrl.getUser);
router.put('/:id', auth, checkPermission('MANAGE_USERS'), ctrl.updateUser);
router.delete('/:id', auth, checkPermission('MANAGE_USERS'), ctrl.deleteUser);

module.exports = router;