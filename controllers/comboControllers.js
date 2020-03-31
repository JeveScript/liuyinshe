const  comboModel = require('./../models/comboModel');
const  courseModel =  require('./../models/courseModel');
const {newFormatTime, formatTime } = require('./../utils/formaDate.js');

const comboControllers = {
  add:async function(req, res, next){
    try{
      let course_id = req.body.course_id;
      let combo_name = req.body.combo_name;
      let description = req.body.description;
      let judge = await courseModel.where({id:course_id}).whereNull('isdeleted');
      if(judge.length <= 0){
        return res.json({code:0,message:'无此科目，请重新选择'})
      }
      await comboModel.insert({course_id,combo_name,description,created_at:newFormatTime()})
      res.json({code:200,message:'新增套餐成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  del:async function(req, res, next){
    try{
      let id = req.params.id;
      let judge = await comboModel.where({id}).whereNull('isdeleted');
      if(judge.length <= 0){
        return res.json({code:0,message:'该科目不存在或已被删除'})
      }
      await comboModel.sortDelete(id)
      res.json({code:200,message:'删除成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  update:async function(req, res, next){
    try{
      let id = req.params.id;
      let course_id = req.body.course_id;
      let combo_name = req.body.combo_name;
      let description = req.body.description;
      let judge = await comboModel.where({id}).whereNull('isdeleted');
      if(judge.length <= 0){
        return res.json({code:0,message:'无此套餐，请重新选择'})
      }
      await comboModel.update(id, {course_id,combo_name,description})
      res.json({code:200,message:'更新套餐成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  all:async function(req, res, next){
    try{
      let data = await comboModel.all()
      .whereNull('course.isdeleted')
      .leftJoin('course','course.id','combo.course_id')
      .select('combo.*',{'course_name':'course.name'});
      data.forEach(item => {
        item.created_at = formatTime(item.created_at)
      })
      res.json({code:200,data})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  show:async function(req, res, next){
    try{
      let id = req.params.id;
      let data = await comboModel.where({'combo.id':id})
      .whereNull('course.isdeleted')
      .leftJoin('course','course.id','combo.course_id').select('combo.*',{'course_name':'course.name'});;
      if(data.length <= 0){
        return res.json({code:0,message:'无此套餐，请重新选择'})        
      }
      data.forEach(item => {
        item.created_at = formatTime(item.created_at)
      })
      res.json({code:200, data:data[0]});
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  }
}
module.exports = comboControllers