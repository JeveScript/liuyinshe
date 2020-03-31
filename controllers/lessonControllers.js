let lessonModel = require('./../models/lessonModel');
let classModel = require('./../models/classModel');
const user_lessonModel =  require('./../models/user_lessonModel')

const {newFormatTime, formatTime, formatDate} = require('./../utils/formaDate.js');

const lessonControllers = {
  add:async function(req, res, next){
    try{
      let teacher_id = req.body.teacher_id;
      let class_id = req.body.class_id;
      let end_at = new Date(req.body.end_at);
      let start_at = new Date(req.body.start_at);
      let type = req.body.type;
      if(!class_id){
        return json({code:0, message:'数据不够，请重新选择'})
      }
      await lessonModel.insert({teacher_id,class_id,end_at,start_at,created_at:newFormatTime(),type});
      await classModel.where({id:class_id}).increment('index',1)
      res.json({code:200, message:'单节课添加成功'})
    }catch(e){
      console.log(e)
      res.json({code:0,message:'服务器错误'})
    }
  },
  update: async function(req, res, next){
    try{
      let teacher_id = req.body.teacher_id;
      let id = req.params.id;
      let end_at = new Date(req.body.end_at);
      let start_at = new Date(req.body.start_at);
      if(!teacher_id || !id || !end_at || !start_at){
        return res.json({code:0, message:'数据不够，请重新填写'})
      }
      await lessonModel.update(id,{teacher_id,end_at,start_at});
      res.json({code:200, message:'单节课修改成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  end: async function(req, res, next){
    try{
      let id = req.params.id;
      if(!id){
        return res.json({code:0,message:'数据不够，请重新选择'})
      }
      await lessonModel.update(id,{status:1});
      res.json({code:200, message:'该节课已完结'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  all:async function(req, res, next){
    try{
      let class_id = req.query.id;
      if(!class_id){
        return res.json({code:0,message:'数据不够，请重新选择'})
      }
      let data = await lessonModel.where({class_id})
      .leftJoin('teacher','teacher.id','lesson.teacher_id')
      .select('lesson.*',{teacher_name:'teacher.name'})
      .orderBy('start_at')
      data.forEach(item => {
        if (item.created_at) item.created_at = formatTime(item.created_at)
      })
      res.json({code:200,data})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  show:async function(req, res, next){
    try{
      let id = req.params.id;
      if(!id){
        return res.json({code:0, message:'数据不够，请重新选择'})
      }
      let data = await lessonModel.where({'lesson.id':id})
      .leftJoin('class','class.id','lesson.class_id')
      .select('lesson.*',{class_name:'class.start_at'});
      let userArr = await user_lessonModel.where({lesson_id:id})
      .leftJoin('user','user_lesson.user_id','user.id')
      .select({'user_lesson_id':'user_lesson.id'},{'user_name':'user.name'},{'user_phone':'user.phone'},{status:'user_lesson.status'})
      data[0].class_name = formatDate(data[0].class_name)
      res.json({code:200,data: {data: data[0], userArr}})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  }
}
module.exports = lessonControllers;