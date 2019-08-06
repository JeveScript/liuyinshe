var express = require('express');
var router = express.Router();
var managerController = require('./../controllers/managerController.js');
var userController = require('./../controllers/userController.js');
var paymentController = require('./../controllers/paymentController.js');
var courseController = require('./../controllers/courseController.js');
var classController = require('./../controllers/classController.js');
var lessonController = require('./../controllers/lessonController.js');

// 管理员
router.post('/manager', managerController.insert);
router.get('/manager/:id', managerController.show);
router.put('/manager/:id', managerController.update);
router.delete('/manager/:id', managerController.delete);
router.get('/manager', managerController.index);
// 用户
router.post('/user', userController.insert);
router.get('/user/:id', userController.show);
router.put('/user/:id', userController.update);
router.get('/user', userController.index);
// 收支
router.post('/payment', paymentController.insert);
router.get('/payment', paymentController.index);
// 课程
router.post('/course', courseController.insert);
router.get('/course/:id', courseController.show);
router.put('/course/:id', courseController.update);
router.delete('/course/:id', courseController.delete);
router.get('/course', courseController.index);
// 班
router.get('/class', classController.index);
router.post('/class', classController.insert);
router.put('/class/:id', classController.update);
router.get('/class/:id', classController.show);
// 课
router.put('/lesson/:id', lessonController.update);

module.exports = router;
