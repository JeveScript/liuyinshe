var express = require('express');
var router = express.Router();
var managerController = require('./../controllers/managerController.js');
var userController = require('./../controllers/userController.js');

// 管理员
router.post('/manager', managerController.insert);
router.get('/manager/:id', managerController.show);
router.put('/manager/:id', managerController.update);
router.delete('/manager/:id', managerController.delete);
router.get('/manager', managerController.index);

router.post('/user', userController.insert);
router.get('/user/:id', userController.show);
router.put('/user/:id', userController.update);
router.get('/user', userController.index);

module.exports = router;
