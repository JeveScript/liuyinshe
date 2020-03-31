const  comboModel =  require('./../models/comboModel');
const  combo_planModel =  require('./../models/combo_planModel.js');
const {newFormatTime, formatTime} = require('./../utils/formaDate.js');

const comboControllers = {
 add:async function(req, res, next){
  try{
    let combo_id = req.body.combo_id
    let plan_name = req.body.plan_name;
    let description = req.body.description;
    let judge = await comboModel.where({id:combo_id}).whereNull('isdeleted');
    if(judge.length <= 0){
      return res.json({code:0,message:'无此套餐，请重新选择'})
    }
    await combo_planModel.insert({combo_id,plan_name,description,created_at:newFormatTime()})
    res.json({code:200,message:'套餐计划添加成功'})
  }catch(e){
    res.json({code:0,message:'服务器错误'})
  }
 },
 del:async function(req, res, next){
   try{
    let id = req.params.id;
    let judge = await combo_planModel.where({id}).whereNull('isdeleted');
    if(judge.length <= 0){
      return res.json({code:0,message:'无此套餐计划，请重新选择'})
    }
    await combo_planModel.sortDelete(id);
    res.json({code:200, message:'套餐计划删除成功'})
   }catch(e){
    res.json({code:0, message:"服务器错误"})
   }
 },
 update:async function(req, res, next){
   try{
    let id = req.params.id;
    let combo_id = req.body.combo_id;
    let plan_name = req.body.plan_name;
    let description = req.body.description;
    let combojudge = await comboModel.where({id:combo_id}).whereNull('isdeleted');
    if(combojudge.length <= 0){
      return res.json({code:0,message:'无此套餐，请重新选择'})
    }
    let judge = await combo_planModel.where({id}).whereNull('isdeleted');
    if(judge.length <= 0){
      return res.json({code:0,message:'无此套餐计划，请重新选择'})
    }
    await combo_planModel.update(id,{combo_id,plan_name,description})
    res.json({code:200,message:'套餐计划修改成功'})
   }catch(e){
    res.json({code:0, message:"服务器错误"})
   }
 },
 all:async function(req, res, next){
   try{
    let data = await combo_planModel.all()
    .whereNull('combo_plan.isdeleted')
    .leftJoin('combo','combo.id','combo_plan.combo_id')
    .leftJoin('course','course.id','combo.course_id')
    .select('combo_plan.*',{'combo_name':'combo.combo_name'},{'course_name':"course.name"});
    data.forEach(item => {
      if (item.created_at) item.created_at = formatTime(item.created_at)
    })
    res.json({code:200,data})
   }catch(e){
    res.json({code:0, message:"服务器错误"})
   }
 },
 
 show:async function(req, res, next){
   try{ 
    let id = req.params.id;
    let data = await combo_planModel.where({id}).whereNull('isdeleted');
    if(data.length <= 0){
      return res.json({code:0,message:'无此套餐计划，请重新选择'})
    }
    res.json({code:200,data:data[0]})
   }catch(e){
    res.json({code:0, message:"服务器错误"})
   }
 }
}
module.exports = comboControllers