let classModel = require('./../models/classModel');
const {newFormatTime,formatDate,formatTime} = require('./../utils/formaDate.js');
let lessonModel = require('./../models/lessonModel');
const  teacherModel =  require('./../models/teacherModel')

const classControllers = {
  add: async function(req, res, next){
    try{
      let time = req.body.start_at;
      let start_at = formatDate(new Date(time))
      let judge = await classModel.where({start_at});
      if(judge.length > 0){
        return res.json({code:0, message:'日期课程已存在,请重新填写'})
      }
      let data = await classModel.insert({start_at,created_at:newFormatTime(),index:0})
      res.json({code:200,message:'日期课程创建成功',data:data[0]})
    }catch(e){
      return res.json({code:0, message:'服务器出错'})
    }
  },
  // 返回指定年月的数据，若无指定则返回当前月。
  thisMonth_show:async function(req, res, next){
    try{
      let thisYear = req.query.thisYear || (new Date()).getFullYear();
      let thisMonth = req.query.thisMonth || (new Date()).getMonth() + 1;
      let today = new Date(thisYear,thisMonth,0);
      today = today.getDate()
      let startAt = thisYear + '-' + thisMonth + '-' + '01';
      let endAt =thisYear + '-' + thisMonth + '-' + today;
      let data  = await classModel.knex().whereBetween('start_at',[`${startAt} 00:00`, `${endAt} 23:59`]).select();
      data.forEach(item => {
        item.start_at = formatDate(item.start_at)
        item.created_at = formatTime(item.created_at)
      })
      res.json({code:200, data})
    }catch(e){
      return res.json({code:0, message:'服务器出错'})
    }
  },
  show:async function(req, res, next){
    try{
      let id = req.params.id;
      let data = await classModel.where({id});
      data[0].start_at = formatDate(data[0].start_at)
      res.json({code:200, data:data[0]})      
    }catch(e){
      return res.json({code:0, message:'服务器出错'})
    }
  },
  referShow: async function(req, res, next) {
    try{
      let time = req.body.date;
      let start_at = formatDate(new Date(time))
      let classData = await classModel.where({start_at});
      if(!classData.length){
        return res.json({code:0, message:'日期课程暂未开启,请重新填写'})
      }
      let data = await lessonModel.where({class_id:classData[0].id})
      .leftJoin('teacher','teacher.id','lesson.teacher_id')
      .select('lesson.*',{teacher_name:'teacher.name'})
      .orderBy('start_at')
      data.forEach(item => {
        if (item.created_at) item.created_at = formatTime(item.created_at)
      })
      res.json({code:200, data})
    }catch(e){
      return res.json({code:0, message:'服务器出错'})
    }
  },
  wxClassShow: async function(req, res, next){
    try{
      const start_at = req.params.start_at;
      const teacher_id = req.params.teacher_id;
      console.log(start_at, teacher_id)
      if(!start_at) return res.json({code:0, message:'数据不对,请重新填写'})
      console.log()
      const classData = await classModel.where({start_at})
      if(!classData.length) return res.json({code:0, message:'日期课程暂未开启,请重新填写'})
      const teacherData = await teacherModel.where({id:teacher_id})
      if(!teacherData.length) return res.json({code:0, message:'无此老师,请重新选择'})
      const lessonAll = await lessonModel.where({class_id:classData[0].id, teacher_id})
      res.json({code:200, data:lessonAll})
    }catch(e){
      return res.json({code:0, message:'服务器出错'})
    }
  }
}
module.exports = classControllers;