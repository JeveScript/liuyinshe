var lessonModel = require('./../models/lessonModel.js');
var { formatDate } = require('./../utils/formatDate.js');
var userLessonModel = require('./../models/userLessonModel.js');
var paymentModel = require('./../models/paymentModel.js');
var userModel = require('./../models/userModel.js');

const lessonController = {
  update:async function(req, res, next) {
    let id = req.params.id;
    let date = req.body.date;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;

    if(!date || !start_time || !end_time) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }

    try {
      await lessonModel.update(id, { date, start_time, end_time });
      res.json({code: 200, messsage: '修改成功'})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  status: async function(req,res,next) {
    let id = req.params.id;
    let status = req.body.status;
    console.log(status)
    if(!status) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }

    try {
      await lessonModel.update(id, { status });
      res.json({code: 200, messsage: '修改成功'})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  show: async function(req,res, next ) {
    let lesson_id = req.params.id;

    try {
      let lessons = await lessonModel.where({ id: lesson_id })
      let lesson = lessons[0];
      lesson.date = lesson.date ? formatDate(lesson.date) : '';
      let users = await userLessonModel
        .where({ lesson_id })
        .leftJoin('user', 'user_lesson.user_id', 'user.id')
        .column('user.id','user.name', 'user_lesson.status', 'user_lesson.finish_at')


      res.json({code: 200, messsage: '获取成功', data: {
        lesson: lesson,
        users: users,
      }})
    } catch (err) {
      console.log(err)
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  newDateShow: async function( req, res, next){
    try{
      let newDate = formatDate(new Date());
      let data = await lessonModel.knex().whereBetween('date',[`${newDate} 00:00`, `${newDate} 23:59`])
      .leftJoin('class','class.id','lesson.class_id')
      .column('lesson.id','lesson.date','lesson.start_time','lesson.end_time','class.name')
      .select();
      data.forEach(item => {if(item.date) item.date= formatDate(item.date)}) 
      res.json({code:200,data:data})
    }catch(e){
      console.log(e)
      res.json({code:0,})

    }
  },
  callNow: async function(req,res,next) {
    let lesson_id = req.params.id;
    let user_id = req.body.user_id;

    if(!user_id) {
      res.json({code:0,messsage: '缺少用户参数'});
      return
    }

    try {
      let userLessons = await userLessonModel.where({ lesson_id, user_id });
      let userLesson = userLessons[0];
      if(!userLesson) {
        res.json({code:0,messsage: '该用户没有报班，没有该课程'});
        return
      }
      if(userLesson.status === 1) {
        res.json({code:0,messsage: '该用户已上课'});
        return
      }

      let lessons = await lessonModel.where({id: lesson_id})
      let lessonInfo = lessons[0];
      let total = - lessonInfo.price;
      await userLessonModel.update(userLesson.id, { status: 1, finish_at: new Date()});
      await paymentModel.insert({ 
          user_id: user_id, 
          status: 2, 
          total:  total, 
          remark:  '用户补课 lesson_id:' + lesson_id
        })
      await userModel
        .where({ id: user_id })
        .increment({ balance: total })
      res.json({code: 200, messsage: '补课成功'})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
}

module.exports = lessonController;