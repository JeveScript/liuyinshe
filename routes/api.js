var express = require('express');
var router = express.Router();
var auth = require('./../middlewares/auth')
var managerControllers = require('./../controllers/managerControllers')
var userControllers = require('./../controllers/userControllers')
var qiniuControllers = require('./../controllers/qiniuControllers')
var courseControllers = require('./../controllers/courseControllers')
var teacherControllers = require('./../controllers/teacherControllers')
var comboControllers = require('./../controllers/comboControllers')
var combo_planControllers = require('./../controllers/combo_planControllers')
var classControllers = require('./../controllers/classControllers')
var lessonControllers = require('./../controllers/lessonControllers')
var user_planControllers = require('./../controllers/user_planControllers')
var user_lessonControllers = require('./../controllers/user_lessonControllers')
var paymentControllers = require('./../controllers/paymentControllers')
var leaveControllers = require('./../controllers/leaveControllers')



/* GET home page. */
// 登陆
router.post('/login', managerControllers.login);
// 管理员
router.get('/manager',auth.mustManager, managerControllers.all);
router.post('/manager',auth.mustManager, managerControllers.add);
router.get('/manager/:id',auth.mustManager, managerControllers.show);
router.put('/manager/:id',auth.mustManager, managerControllers.update);
router.delete('/manager/:id',auth.mustManager, managerControllers.del);
// 用户
router.get('/user',auth.mustManager,userControllers.all)
router.get('/payment/user',auth.mustManager,userControllers.paymentUserAll)
router.post('/user',auth.mustManager,userControllers.add)
router.get('/user/:id',auth.mustManager,userControllers.show)
router.put('/user/:id',auth.mustManager,userControllers.update)
router.delete('/user/:id',auth.mustManager,userControllers.vacation)
//用户套餐计划
// router.get('/all/user_plan',user_planControllers.getAll)
router.get('/user_plan',auth.mustManager,user_planControllers.getPlan)
router.post('/user_plan',auth.mustManager,user_planControllers.add)
router.get('/user_plan/:id',auth.mustManager,user_planControllers.all)
router.delete('/user_plan/:id',auth.mustManager,user_planControllers.update)

//用户计划与单节课
router.get('/user_lesson/:id',auth.mustManager,user_lessonControllers.all)
router.post('/user_lesson',auth.mustManager,user_lessonControllers.add)
router.put('/user_lesson/:id',auth.mustManager,user_lessonControllers.end)

// 用户积分
router.post('/integral/add',auth.mustManager,userControllers.integralAdd)
router.post('/integral/reduce',auth.mustManager,userControllers.integralReduce)
// 用户充值/消费
router.post('/total/add',auth.mustManager,userControllers.recharge)
router.post('/total/reduce',auth.mustManager,userControllers.expense)
// 七牛云 token
router.get('/qiniu/token',auth.mustManager,qiniuControllers.getQiniuToken)
// 科目
router.post('/course', auth.mustManager,courseControllers.add)
router.get('/course', auth.mustManager,courseControllers.all)
router.get('/course/:id', auth.mustManager,courseControllers.show)
router.put('/course/:id', auth.mustManager,courseControllers.update)
router.delete('/course/:id',auth.mustManager, courseControllers.del)
// 老师
router.post('/teacher', auth.mustManager,teacherControllers.add)
router.get('/teacher', auth.mustManager,teacherControllers.all)
router.get('/teacher/:id', auth.mustManager,teacherControllers.show)
router.put('/teacher/:id', auth.mustManager,teacherControllers.update)
router.delete('/teacher/:id', auth.mustManager,teacherControllers.del)
// 套餐
router.post('/combo',auth.mustManager, comboControllers.add)
router.get('/combo', auth.mustManager,comboControllers.all)
router.get('/combo/:id', auth.mustManager,comboControllers.show)
router.put('/combo/:id', auth.mustManager,comboControllers.update)
router.delete('/combo/:id', auth.mustManager,comboControllers.del)
// 计划
router.post('/combo_plan', auth.mustManager,combo_planControllers.add)
router.get('/combo_plan', auth.mustManager,combo_planControllers.all)
router.get('/combo_plan/:id', auth.mustManager,combo_planControllers.show)
router.put('/combo_plan/:id', auth.mustManager,combo_planControllers.update)
router.delete('/combo_plan/:id', auth.mustManager,combo_planControllers.del)
// 课程
router.post('/class', auth.mustManager,classControllers.add)
router.get('/class', auth.mustManager,classControllers.thisMonth_show)
router.get('/class/:id', auth.mustManager,classControllers.show)
router.post('/refer_show/class', auth.mustManager,classControllers.referShow)

// 单节课
router.post('/lesson', auth.mustManager,lessonControllers.add)
router.get('/lesson', auth.mustManager,lessonControllers.all)
router.get('/lesson/:id', auth.mustManager,lessonControllers.show)
router.put('/lesson/:id', auth.mustManager,lessonControllers.update)
router.delete('/lesson/:id', auth.mustManager,lessonControllers.end)
// 账单
router.get('/payment', auth.mustManager,paymentControllers.all)
// 请假
router.get('/leave', auth.mustManager,leaveControllers.all)
router.put('/leave', auth.mustManager,leaveControllers.permit)

module.exports = router;