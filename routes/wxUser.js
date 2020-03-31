var express = require('express');
var router = express.Router();
var userControllers = require('./../controllers/userControllers')
var courseControllers = require('./../controllers/courseControllers')
var user_planControllers = require('./../controllers/user_planControllers')
var user_lessonControllers = require('./../controllers/user_lessonControllers')
var leaveControllers = require('./../controllers/leaveControllers')





// 微信
// 学生登陆
router.post('/user/login', userControllers.wxLogin)
// 科目
router.get('/course', courseControllers.all)
// 用户计划
router.get('/user_plan',user_planControllers.wxAll)
// 用户计划与单节课
router.get('/user_lesson/:id',user_lessonControllers.all)
// 用户请假
router.post('/leave/:id',leaveControllers.add)
// 用户退出
router.put('/quit',userControllers.wxQuit)

module.exports = router;