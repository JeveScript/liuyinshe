const leaveModel = require('./../models/leaveModel');
const lessonModel = require('./../models/lessonModel');
const user_lessonModel =  require('./../models/user_lessonModel')
const user_planModel =  require('./../models/user_planModel')
const {newFormatTime,formatDate} = require('./../utils/formaDate.js');
const leaveControllers = {
  all:async function(req, res, next){
    try{
      let data = await leaveModel.all()
      .leftJoin('user_lesson','leave.user_lesson_id','user_lesson.id')
      .leftJoin('user','user.id','user_lesson.user_id')
      .leftJoin('lesson','lesson.id','user_lesson.lesson_id')
      .leftJoin('class','class.id','lesson.class_id')
      .leftJoin('teacher','teacher.id','lesson.teacher_id')
      .select({id:'leave.id'},
      {user_lesson_id:'user_lesson.id'},
      {class_start_at:'class.start_at'},
      {lesson_start_at:'lesson.start_at'},
      {lesson_end_at:'lesson.end_at'},
      {user_name:'user.name'},
      {user_phone:'user.phone'},
      {teacher_name:'teacher.name'}
      )
      .orderBy('id', 'desc')
      data.forEach(item => {
        if(item.class_start_at) item.class_start_at = formatDate(item.class_start_at)
      })
      res.json({code:200, data});
    }catch(e){
      res.json({code:0, message:'服务器错误'});
    }
  },
  add:async function(req, res, next){
    try{
      let user_lesson_id = req.params.id;
      if(!user_lesson_id) return res.json({code:0, message:'数据不足，请重新选择'})
      let juede = await leaveModel.where({user_lesson_id});
      if(juede.length > 0) return res.json({code:0,message:'用户已提交过申请了，请勿重复提交'})
      await leaveModel.insert({user_lesson_id,created_at:newFormatTime()})
      res.json({code:200,message:'请求已提交，请等候'})
    }catch(e){
      res.json({code:0, message:'服务器错误'});
    }
  },
  permit:async function(req, res,next){
    try{
      let leave_id = req.body.leave_id;
      let status = req.body.status;
      if( !leave_id || !status) return res.json({code:0, message:'数据不足，请重新选择'})
      let juede = await leaveModel.where({id:leave_id}).whereNull('status');
      if(juede.length <= 0) return res.json({code:0, message:'数据出错，请重新选择'})
      if(status == 1) {
        let id = juede[0].user_lesson_id;
        await user_lessonModel.update(id,{status:2,end_at:newFormatTime()})
      }
      await leaveModel.where({id:juede[0].id}).del();
      res.json({code:200,message:'请求已确定，请等候'})
    }catch(e){
      res.json({code:0, message:'服务器错误'});
    }
  }

}
module.exports = leaveControllers;