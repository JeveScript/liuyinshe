var express = require('express');
var router = express.Router();
var managerController = require('./../controllers/managerController.js')

// 管理员
router.post('/manager', managerController.insert);
router.get('/manager/:id', managerController.show);
router.put('/manager/:id', managerController.update);
router.delete('/manager/:id', managerController.delete);
router.get('/manager', managerController.index);

module.exports = router;
