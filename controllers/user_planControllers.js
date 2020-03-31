const  user_planModel =  require('./../models/user_planModel')
const  userModel =  require('./../models/userModel')
const  combo_planModel =  require('./../models/combo_planModel.js');
const  comboModel = require('./../models/comboModel');
const  courseModel =  require('./../models/courseModel');
const  paymentModel =  require('./../models/paymentModel')
const  managerModel =  require('./../models/managerModel')
const {newFormatTime,formatTime} = require('./../utils/formaDate.js');
const user_planControllers = {
  getPlan: async function(req, res, next){
    try{
      let courseArr = await courseModel.all().whereNull('isdeleted')
      let a = []
      courseArr.forEach(item => {
        a.push({
          value:item.id,
          label:item.name
        })
      })
      let b =await Promise.all(a.map(async  item => {
        let comboArrA = await comboModel.knex().whereNull('isdeleted').where({course_id:item.value}).column({value:'combo.id'},{label:'combo.combo_name'})
        let comboArrB = await Promise.all(comboArrA.map(async data => {
          data.children = await combo_planModel.knex().whereNull('isdeleted').where({combo_id:data.value}).column({value:'combo_plan.id'},{label:'combo_plan.plan_name'})
          return data
        }))
        item.children = comboArrB
        return item
      }))
      res.json({code:200, data:b})
    }catch(e){
      res.json({code:0, message:'服务器出错'})
    }
  },
  add:async function(req, res, next){
    try{
      let user_id = req.body.user_id;
      let manager_id = req.body.manager_id;
      let plan_id = req.body.plan_id;
      let plan_price = req.body.plan_price;
      let extra_charge = req.body.extra_charge;
      let Class_index = req.body.Class_index || 0;
      let theOne_index = req.body.theOne_index || 0;
      let price;
      let description = req.body.description;
      if(!user_id || !plan_id || !manager_id || isNaN(plan_price) || isNaN(extra_charge)){
        return res.json({code:0, message:'数据不足，请重新填写'})
      }
      let manager  = await managerModel.where({id:manager_id}).whereNull('isdeleted');
      if(manager.length <= 0){
        return res.json({code:0, message:'管理员信息错误，请重新登陆'})
      }
      let plan =  await combo_planModel.where({id:plan_id});
      if(plan.length <= 0){
        return res.json({code:0, message:'套餐计划信息错误，请重新选择'})
      }
      let data =  {
        user_id: Number(user_id),
        plan_id,
        plan_price,
        extra_charge,
        description,
        created_at:newFormatTime(),
        manager_id
      }
      if(Class_index) price = Class_index; data.Class_index = Class_index;
      if(theOne_index) price = theOne_index; data.theOne_index = theOne_index;
      if(!price) return res.json({code:0, message:'数据不足，请重新填写'})
      data.price = plan_price/price;
      let user = await userModel.where({id:user_id});
      if(user[0].balance < extra_charge){
        return res.json({code:0, message:'余额不足，请先充值'})
      }
      let desc = '用户 ' + user[0].name + '购买了' + plan[0].plan_name + '计划的材料费'
      await userModel.where({id:user_id}).decrement('balance',extra_charge)
      await paymentModel.insert({user_id,total:extra_charge,description:desc, status:1,manager_id,created_at:newFormatTime()});
      await user_planModel.insert(data)
      res.json({code:200, message:'购买成功'})
    }catch(e){
      res.json({code:0, message:'服务器出错'})
    }
  },
  all:async function(req, res, next) {
    try{
      let user_id = req.params.id;
      let data = await user_planModel.where({user_id})
      .leftJoin('combo_plan','combo_plan.id','user_plan.plan_id')
      .leftJoin('user','user.id','user_plan.user_id')
      .leftJoin('combo','combo_plan.combo_id','combo.id')
      .leftJoin('course','course.id','combo.course_id')
      .select('user_plan.*',{user_name:'user.name'},{combo_plan_name:'combo_plan.plan_name'},{combo_name:'combo.combo_name'},{course_name:'course.name'})
      data.forEach(item => item.created_at = formatTime(item.created_at))
      res.json({code: 200, data})
    }catch(e){
      res.json({code:0, message:'服务器出错'})
    }
  },
  update:async function(req, res, next){
    try{
      let id = req.params.id;
      await user_planModel.update(id,{status:1})
      res.json({code:200, message:'套餐计划已完成'})
    }catch(e){
      res.json({code:0, message:'服务器出错'})
    }
  },
  wxAll:async function(req, res, next) {
    try{
      let course_id = req.query.course_id
      let user_id = req.query.user_id;
      if(!course_id || !user_id) return res.json({code:0, message:'数据不足'})
      let data = await user_planModel.where({user_id,'course.id':course_id})
      .leftJoin('combo_plan','combo_plan.id','user_plan.plan_id')
      .leftJoin('user','user.id','user_plan.user_id')
      .leftJoin('combo','combo_plan.combo_id','combo.id')
      .leftJoin('course','course.id','combo.course_id')
      .select('user_plan.*',{user_name:'user.name'},{combo_plan_name:'combo_plan.plan_name'},{combo_name:'combo.combo_name'},{course_name:'course.name'})
      data.forEach(item => item.created_at = formatTime(item.created_at))
      res.json({code: 200, data})
    }catch(e){
      res.json({code:0, message:'服务器出错'})
    }
  }
}
module.exports = user_planControllers;