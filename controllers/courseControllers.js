const  courseModel =  require('./../models/courseModel')
const {newFormatTime, formatTime } = require('./../utils/formaDate.js');

const courseControllers = {
  add:async function(req, res, next){
    try{
      let name = req.body.name;
      let description = req.body.description;
      let course_image = req.body.course_image;
      if(!name || !description || !course_image){
        return res.json({code:0,message:'请填写科目名称'})
      }
      await courseModel.insert({name,description,course_image,created_at:newFormatTime()})
      res.json({code:200,message:'添加成功'})

    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  all:async function(req, res, next){
    try{
      let courseData = await courseModel.knex().whereNull('isdeleted').select();
      let data = courseData.map(item => {
        if(item.created_at) item.created_at = formatTime(item.created_at)
        return item
      })
      res.json({code:200, data})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  del:async function(req, res, next){
    try{
      let id = req.params.id;
      await courseModel.update(id,{isdeleted:0})
      res.json({code:200, message:'删除成功'})

    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  update: async function(req, res, next){
    try{
      let id = req.body.id;
      let name = req.body.name;
      let description = req.body.description;
      let course_image = req.body.course_image;
      if(!name || !description || !course_image){
        return res.json({code:0,message:'请填写科目名称'})
      }
      await courseModel.update(id,{name,description,course_image})
      res.json({code:200,message:'修改成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  show:async function(req, res, next){
    try{
      let id = req.params.id;
      if(!id){
        return res.json({code:0,message:'请重新选择科目'})
      }
      let data = await courseModel.where({id});
      if(data.length <= 0){
        return res.json({code:0,message:'无此科目，请重新选择'})
      }
      res.json({code:200, data})
    }catch(e){
      res.json({code:200,message:'添加成功'})
    }
  }

}
module.exports = courseControllers