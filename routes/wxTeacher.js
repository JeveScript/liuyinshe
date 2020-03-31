var express = require('express');
var router = express.Router();
var teacherControllers = require('./../controllers/teacherControllers')
var classControllers = require('./../controllers/classControllers')
var lessonControllers = require('./../controllers/lessonControllers')
var user_lessonControllers = require('./../controllers/user_lessonControllers')

// var courseControllers = require('./../controllers/courseControllers')
// var user_planControllers = require('./../controllers/user_planControllers')
// var user_lessonControllers = require('./../controllers/user_lessonControllers')
// var leaveControllers = require('./../controllers/leaveControllers')





// 微信
// 老师登陆
router.post('/teacher/login', teacherControllers.wxLogin)
// 获取老师课程
router.get('/teacher/class/:start_at/:teacher_id', classControllers.wxClassShow)
// 获取课程用户详情
router.get('/teacher/lesson/:id', lessonControllers.show)
// 课程用户状态
router.put('/user/lesson/:id', user_lessonControllers.end)

module.exports = router;