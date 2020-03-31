const  managerModel =  require('./../models/managerModel')
const {newFormatTime } = require('./../utils/formaDate.js');
const authCode = require('./../utils/authCode.js');
const managerControllaers = {
  add: async function(req, res, next) {
    try{
      let name = req.body.name;
      let phone = req.body.phone;
      let password = req.body.password;
      let status = req.body.status;
      if(!name || !phone || !password || isNaN(status)){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      let judge = await managerModel.where({phone});
      if(judge.length > 0){
        return res.json({code:0, message:'管理员已存在，请重新填写'})
      }
      await managerModel.insert({name,phone,password,status,created_at:newFormatTime()})
      res.json({code:200,message:'添加成功，欢迎你，' + name})
    }catch(e){
      res.json({code:0,message:'服务器错误'})

    }
  },
  del:async function(req, res, next){
    try{
      let id = req.params.id;
      if(!id){
        return res.json({code:0,message:'数据不足，请重新选择'})
      }
      let exist = await managerModel.where({id})
      if(exist.length <= 0){
        return res.json({code:0,message:'无此用户，请重新选择'})

      }
      await managerModel.sortDelete(id)
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
      let password = req.body.password;
      let status = req.body.status;
      if(!id || !name || !phone || !password || isNaN(status)){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      await managerModel.update(id,{name,phone,password,status})
      res.json({code:200,message:'更新成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  all:async function(req,res,next){
    try{
      let data = await managerModel.knex().whereNull('isdeleted').select('id','name','phone','status','created_at')
      res.json({code:200,data:data})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  show:async function(req, res, next){
    try{
      let id = req.params.id;
      let data = await managerModel.where({id});
      res.json({code:200,data:data})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  login:async function(req, res, next){
    try{
      let phone = req.body.phone;
      let password = req.body.password;
      if(!phone || !password){
        return res.json({code:0,message:'数据不足，不可登陆'})
      }
      let judge = await managerModel.where({phone,password});
      if(judge.length <= 0 ){
        return res.json({code:0,message:'无此用户，不可登陆'})
      }
      if(judge[0].isdeleted == 0 ){
        return res.json({code:0,message:'无此用户，不可登陆'})
      }
      let manager_id = judge[0].id;
      let manager_name = judge[0].name;
      let manager_status = judge[0].status;
      let str = phone + '\t' + password + '\t'+ 'wuye' + '\t' + manager_id;
      let token = authCode(str, 'ENCODE');
      res.json({code:200,data:{manager_name,manager_status,manager_id,token}})
    }catch(e){
      res.json({code:0,message:'服务器错误'})

    }
  }
}

module.exports = managerControllaers;