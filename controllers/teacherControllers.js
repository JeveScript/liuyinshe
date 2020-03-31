const  teacherModel =  require('./../models/teacherModel')
const {newFormatTime } = require('./../utils/formaDate.js');
const  wx = require('./../utils/wxLogin')
let lessonModel = require('./../models/lessonModel');
const teacherControllaers = {
  add: async function(req, res, next) {
    try{
      let name = req.body.name;
      let phone = req.body.phone;
      let desc = req.body.desc;
      let image = req.body.image;
      if(!name || !phone ){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      let judge = await teacherModel.where({phone});
      if(judge.length > 0){
        return res.json({code:0, message:'老师已存在，请重新填写'})
      }
      await teacherModel.insert({name,phone,desc,image,created_at:newFormatTime()})
      res.json({code:200,message:'添加成功，欢迎你，' + name})
    }catch(e){
      res.json({code:0,message:'服务器错误'})

    }
  },
  del:async function(req, res, next){
    try{
      let teacherId = req.params.id;
      if(!teacherId){
        return res.json({code:0,message:'数据不足，请重新选择'})
      }
      let exist = await teacherModel.where({id:teacherId})
      if(exist.length <= 0){
        return res.json({code:0,message:'无此用户，请重新选择'})

      }
      await teacherModel.sortDelete(teacherId)
      res.json({code:200,message:'删除成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  update:async function(req, res, next){
    try{
      let id = req.params.id;
      let name = req.body.name;
      let phone = req.body.phone;
      let desc = req.body.desc;
      let image = req.body.image;
      if(!id || !name || !phone){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      let data = {
          id,name,phone
      }
      if(desc) data.desc = desc;
      if(image) data.image = image;
      await teacherModel.update(id,data)
      res.json({code:200,message:'更新成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  all:async function(req,res,next){
    try{
      let data = await teacherModel.knex().whereNull('isdeleted')
      res.json({code:200,data:data})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  show:async function(req, res, next){
    try{
      let teacherId = req.params.id;
      let data = await teacherModel.where({id:teacherId});
      // let lessonData = await lessonModel.where({teacher_id:teacherId}).limit(20).orderBy('created_at', 'desc')
      res.json({code:200,data:{data:data[0]}})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  wxLogin: async function(req, res, next) {
    try{
      console.log(123231313)
      const id = req.body.id;
      const phone = req.body.phone;
      const name = req.body.name;
      const code = req.body.code;
      console.log(id, name, phone)
      if(!id || !phone || !name || !code)  return res.json({code:0, message:'数据不足，请重新填写'})
      let open_idData = await wx.getOpenId(code);
      const open_id = open_idData.data.openid
      const teacherData = await teacherModel.where({id, phone, name});
      if(teacherData.length <= 0) return res.json({code:0, message:'无此用户，请重新填写'})
      if(teacherData[0].open_id){
        if(teacherData[0].open_id != open_id) return res.json({code:0,message:'用户登陆错误,请重新登陆'})
        res.json({code:200,message: "登陆成功", data: {teacher_id:teacherData[0].id, teacher_name:teacherData[0].name}})
      }else{
        await teacherModel.update(teacherData[0].id, {open_id})
        res.json({code:200,message: "初次登陆成功", data: {teacher_id:teacherData[0].id, teacher_name:teacherData[0].name}})
      }
    }catch(e){
      console.log(e)
      res.json({code:0,message:'服务器错误'})
    }
  }
}

module.exports = teacherControllaers;