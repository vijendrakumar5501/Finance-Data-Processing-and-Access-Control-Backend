const router = require('express').Router();
const ctrl = require('../controllers/record.controller');
const { auth } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/role.middleware');

router.post('/', auth, checkPermission('CREATE_RECORD'), ctrl.createRecord);
router.get('/', auth, checkPermission('READ_RECORD'), ctrl.getRecords);
router.put('/:id', auth, checkPermission('UPDATE_RECORD'), ctrl.updateRecord);
router.delete('/:id', auth, checkPermission('DELETE_RECORD'), ctrl.deleteRecord);

module.exports = router;