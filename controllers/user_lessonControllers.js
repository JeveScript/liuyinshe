const user_lessonModel =  require('./../models/user_lessonModel')
const user_planModel =  require('./../models/user_planModel')
const userModel =  require('./../models/userModel')
const paymentModel =  require('./../models/paymentModel')
const lessonModel = require('./../models/lessonModel');
const combo_planModel =  require('./../models/combo_planModel.js');
const classModel = require('./../models/classModel');
const  comboModel = require('./../models/comboModel');
const {newFormatTime,formatDate } = require('./../utils/formaDate.js');
const user_lessonControllers = {
  all: async function(req, res, next) {
    try{
      let user_plan_id = req.params.id;
      let data = await user_lessonModel.where({'user_lesson.user_plan_id':user_plan_id})
      .leftJoin('lesson','lesson.id','user_lesson.lesson_id')
      .leftJoin('class','class.id','lesson.class_id')
      .leftJoin('teacher','lesson.teacher_id','teacher.id')
      .select(
      {'id':'user_lesson.id'},
      {lesson_id:'lesson.id'},
      {'class_name':'class.start_at'},
      {start_at:'lesson.start_at'},
      {end_at:'lesson.end_at'},
      {teacher_name:'teacher.name'},
      {class_index_name:'user_lesson.class_name'},
      {lesson_status:'lesson.status'},{user_lesson_status:'user_lesson.status'})
      .orderBy('lesson.created_at', 'desc')
      data.forEach(item => {
       if(item.class_name) item.class_name = formatDate(item.class_name)
      })
      return res.json({code:200, data})
    }catch(e){
      return res.json({code:0, message:'服务器错误'})
    }
  },
  add:async function(req, res, next){
    try{
      let lesson_id = req.body.lesson_id;
      let user_plan_id = req.body.user_plan_id;
      let class_name = req.body.class_name;
      if(!lesson_id || !user_plan_id || !class_name){
        return res.json({code:0, message:'数据不够，请重新填写'})
      }
      let user_planData = await user_planModel.where({id:user_plan_id})
      let user_id = user_planData[0].user_id;
      let user = await userModel.where({id:user_id});
      let lesson = await lessonModel.where({id:lesson_id});
      if(user.length<= 0 || lesson.length <= 0){
        return res.json({code:0, message:'数据不对，请重新选择'})
      }
      let user_lesson = await user_lessonModel.where({user_id,lesson_id});
      if(user_lesson.length > 0) return res.json({code:0, message:'该学生已参加该课程了，请勿重复添加'})
      let judge = class_name == 2 ? 'theOne_index' : 'Class_index';
      let user_plan = await  user_planModel.knex().where({id:user_plan_id}).where(judge, '>', 0).select();

      if(user_plan.length <= 0){
        return res.json({code:0, message:'用户套餐课时不足，请重新选择'})
      }
      await user_lessonModel.insert({user_id,lesson_id,created_at:newFormatTime(),user_plan_id,class_name})
      return res.json({code:200, message:'用户添加成功'})
    }catch(e){
      return res.json({code:0, message:'服务器错误'})
    }
  },
  end:async function(req, res, next){
    try{
      let id = req.params.id;
      let status = req.body.status;
      if(!id || !status){
        return res.json({code:0, message:'数据不对，请重新选择'})
      }
      let judge = await user_lessonModel.where({id}).whereNull('status');
      if(judge.length <= 0){
        return res.json({code:0, message:'信息有误，请重新选择'})
      }
      if(status != 2){
        let user = await userModel.where({id:judge[0].user_id});
        let user_plan = await user_planModel.where({id:judge[0].user_plan_id});
        let plan = await combo_planModel.where({id:user_plan[0].plan_id})
        let combo = await comboModel.where({id:plan[0].combo_id})
        let type = plan[0].type == 1 ? '一对一' : '公开课'
        let price = user_plan[0].price
        if(user[0].balance < price){
          return res.json({code:0, message:'余额不足，请先充值'})
        }
        let details = status == 1 ? '签到' : '旷课'
        let className = judge[0].class_name == 1 ? 'Class_index' : 'theOne_index'
        let desc = '用户 ' + user[0].name + '消费了' + combo[0].combo_name + plan[0].plan_name + '一节课  ' +  type + ' '  + details
        let lessonData = await lessonModel.where({id:judge[0].lesson_id})
        await userModel.where({id:user[0].id}).decrement('balance',price)
        await user_planModel.where({id:user_plan[0].id}).decrement(className, 1)
        await paymentModel.insert({user_id:user[0].id,total:price,description:desc, status:1 ,created_at:newFormatTime(), teacher_id:lessonData[0].teacher_id});
        await user_lessonModel.update(id,{status,end_at:newFormatTime()})
        return res.json({code:200,message:'用户完成该课时'})
      }
      await user_lessonModel.update(id,{status,end_at:newFormatTime()})
      return res.json({code:200, message:'用户完成该课时'})
    }catch(e){
      return res.json({code:0, message:'服务器错误'})
    }
  }
}
module.exports = user_lessonControllers;