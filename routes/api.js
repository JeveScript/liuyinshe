var express = require('express');
var router = express.Router();
var managerController = require('./../controllers/managerController.js');
var userController = require('./../controllers/userController.js');
var paymentController = require('./../controllers/paymentController.js');
var courseController = require('./../controllers/courseController.js');
var classController = require('./../controllers/classController.js');
var lessonController = require('./../controllers/lessonController.js');
var authController = require('./../controllers/authController.js');
var authMiddleware = require('./../middlewares/auth.js');

// 通用
router.post('/auth/login', authController.login);
// 管理员
router.post('/manager', authMiddleware.mustManager, managerController.insert);
router.get('/manager/:id', authMiddleware.mustManager, managerController.show);
router.put('/manager/:id', authMiddleware.mustManager, managerController.update);
router.delete('/manager/:id', authMiddleware.mustManager, managerController.delete);
router.get('/manager', authMiddleware.mustManager, managerController.index);
// 用户
router.post('/user', authMiddleware.mustManager, userController.insert);
router.get('/user/:id', authMiddleware.mustManager, userController.show);
router.put('/user/:id', authMiddleware.mustManager, userController.update);
router.get('/user', authMiddleware.mustManager, userController.index);
// 收支
router.post('/payment', authMiddleware.mustManager, paymentController.insert);
router.get('/payment', authMiddleware.mustManager, paymentController.index);
// 课程
router.post('/course', authMiddleware.mustManager, courseController.insert);
router.get('/course/:id', authMiddleware.mustManager, courseController.show);
router.put('/course/:id', authMiddleware.mustManager, courseController.update);
router.delete('/course/:id', authMiddleware.mustManager, courseController.delete);
router.get('/course', authMiddleware.mustManager, courseController.index);
// 班
router.get('/class', authMiddleware.mustManager, classController.index);
router.post('/class', authMiddleware.mustManager, classController.insert);
router.put('/class/:id', authMiddleware.mustManager, classController.update);
router.get('/class/:id', authMiddleware.mustManager, classController.show);
router.post('/class/:id/adduser', authMiddleware.mustManager, classController.addUser);
// 课
router.put('/lesson/:id', authMiddleware.mustManager, lessonController.update);
router.get('/lesson/:id', authMiddleware.mustManager, lessonController.show);
router.post('/lesson/:id/callnow', authMiddleware.mustManager, lessonController.callNow);


module.exports = router;
