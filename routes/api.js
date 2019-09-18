const express = require('express');
const router = express.Router();
const managerController = require('./../controllers/managerController.js');
const userController = require('./../controllers/userController.js');
const paymentController = require('./../controllers/paymentController.js');
const courseController = require('./../controllers/courseController.js');
const classController = require('./../controllers/classController.js');
const lessonController = require('./../controllers/lessonController.js');
const authController = require('./../controllers/authController.js');
const leaveController = require('./../controllers/leaveController.js');
const miniController = require('./../controllers/miniController.js');
const teacherController = require('./../controllers/teacherController.js');
const qiniuController = require('./../controllers/qiniu.js');
const noteController = require('./../controllers/note.js');

const authMiddleware = require('./../middlewares/auth.js');


// 通用
router.post('/auth/login', authController.login);
// 管理员
router.post('/manager', authMiddleware.mustManager, managerController.insert);
router.get('/manager/:id', authMiddleware.mustManager, managerController.show);
router.put('/manager/:id', authMiddleware.mustManager, managerController.update);
router.delete('/manager/:id', authMiddleware.mustManager, managerController.delete);
router.get('/manager', authMiddleware.mustManager, managerController.index);
// 用户
router.get('/userS',authMiddleware.mustManager, userController.userS)
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
router.post('/lesson/:id/status', authMiddleware.mustManager, lessonController.status);
router.get('/nowdate/lesson',authMiddleware.mustManager, lessonController.newDateShow)
// 请假
router.get('/leave', authMiddleware.mustManager, leaveController.index);
router.put('/leave/:id', authMiddleware.mustManager, leaveController.update);

//小程序
router.post('/miniprogram/wxlogin', miniController.wxlogin);
router.post('/miniprogram/wxbind', miniController.wxbind);
router.get('/miniprogram/user/:user_id/class', miniController.class);
router.get('/miniprogram/user/:user_id/class/:class_id', miniController.classItem);
router.post('/miniprogram/user-lesson/:id/leave-apply', miniController.leaveApply);

// 老师
router.get('/teacher', teacherController.index);
router.get('/teacher/:teacher_id', teacherController.show);
router.put('/teacher/:teacher_id',teacherController.update);
router.post('/teacher',teacherController.insert);

// 七牛云获取token
router.get('/qiniu/token',qiniuController.setQiniuToken)

// 发短信
router.post('/note',noteController.send)
router.get('/note',noteController.show)


module.exports = router;
